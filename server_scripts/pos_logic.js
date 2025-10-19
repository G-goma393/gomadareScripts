(function() {
  var mob, sourceEvent, source, cap, reflectDamage, attacker;

  L2Hostility.newAttackListener()
    .subscribeDamage(e => {
      try {
        // --- 1. ダメージを受けたMobを取得 ---
        mob = e.getAttackTarget();
        if (mob == null) return;

        // --- 2. 攻撃者エンティティを「e」から直接取得 ---
        attacker = e.getAttacker();

        // --- 3. 攻撃者が存在し、かつプレイヤーであるか ---
        if (attacker && attacker.isPlayer()) {
          
          // --- 4. 'source' を正しく取得 ---
          sourceEvent = e.getLivingDamageEvent();
          source = sourceEvent.getSource(); // 'sourceEvent' から 'source' を取得

          // --- 5. L2Hostilityの関数で「物理攻撃」か判定 (引数を 'source' に修正) ---
          if (L2Hostility.sourceIs(source, "#forge:direct") || L2Hostility.sourceIs(source, "#minecraft:is_projectile")) {
            
            // --- 6. Mobが特性を持っているか確認 ---
            cap = L2Hostility.of(mob);
            if (cap == null) return;

            if (cap.getTraitLevel("gomadare:thornmail") > 0) {
              reflectDamage = 2.0;
              
              // --- 7. 反射ダメージを実行 ---
              attacker.attack(mob.level.damageSources().thorns(mob), reflectDamage);
            }
          }
        }
      } catch (ex) {
        console.log("Error in gomadare:thornmail logic: ".concat(ex));
      }
    })
    .register(10000);

})();
