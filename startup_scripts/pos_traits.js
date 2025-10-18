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
});
