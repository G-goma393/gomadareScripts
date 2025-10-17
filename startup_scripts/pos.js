StartupEvents.registry('item', e => {
  e.create('gomadare:thornmail', 'trait');
});

StartupEvents.registry('l2hostility:trait', e => {

  // 【能力1】 追加物理防御力を提供する特性
  // タイプは 'attribute' を使用
  e.create('gomadare:thornmail_armor', 'attribute')
    // .attribute('ユニークID', '対象ステータス', '量', '計算方法')
    // ここでは物理防御力を4ポイント（鎧2個分）加算(+)しています。
    .attribute('thornmail_armor_bonus', 'minecraft:generic.armor', 4.0, 'addition');


  // 【能力2】 攻撃を反射する特性
  // タイプは 'basic' を使用
  e.create('gomadare:thornmail_reflect', 'basic')
    // .onDamaged(event => { ... }) は、この特性を持つMobがダメージを受けた時に実行されます
    .onDamaged(event => {
      const { source, mob } = event; // イベントから攻撃者(source)と自身(mob)の情報を取得

      // 攻撃者がプレイヤーで、かつダメージが物理攻撃の場合のみ実行
      if (source.isPlayer() && event.isPhysical()) {
        
        // 反射する固定ダメージ量 (2.0 = 1ハート分)
        const reflectDamage = 200.0;

        // 攻撃者に「Thorns(棘)」属性のダメージを与える
        // mob.level.damageSources().thorns(mob) は、「このMobからの反射ダメージ」というダメージソースを生成します
        source.attack(mob.level.damageSources().thorns(mob), reflectDamage);
      }
    });
});