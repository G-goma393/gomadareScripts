// L2Hostilityのグローバルな攻撃リスナーを登録
L2Hostility.newAttackListener()
// .subscribeDamage() は「Mobがダメージを受けた時」に常時実行される
.subscribeDamage(e => {
    try {
        const target = e.getAttackTarget(); // ダメージを受けたMob
        const sourceEvent = e.getLivingDamageEvent(); // 元々のダメージイベント
        const source = sourceEvent.getSource(); // ダメージソース

        // MobのL2Hostility情報を取得
        const cap = L2Hostility.of(target);
        if (cap == null) return; // L2H対象外なら終了

        // Mobが 'gomadare:thornmail_reflect' 特性を持っているか確認
        if (cap.getTraitLevel("gomadare:thornmail_reflect") > 0) {

            // 攻撃者がプレイヤーで、かつ物理攻撃の場合のみ
            if (source.isPlayer() && sourceEvent.isPhysical()) {
                const reflectDamage = 2.0; // 1ハート分の反射ダメージ
                const attacker = source.getEntity(); // 攻撃者(プレイヤー)

if (attacker) {
    // 攻撃者に「Thorns(棘)」属性の反射ダメージを与える
    attacker.attack(target.level.damageSources().thorns(target), reflectDamage);
}
            }
        }
    } catch (ex) {
        console.log("Error in gomadare:thornmail_reflect logic: " + ex);
    }
})
.register(10000); // 優先度 (exampleのまま)
