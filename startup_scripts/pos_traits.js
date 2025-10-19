StartupEvents.registry('item', e => {
  e.create('gomadare:thornmail', 'trait');
});

StartupEvents.registry('l2hostility:trait', e => {

  // アイテム 'gomadare:thornmail' と連動する「ガワ」の特性
  e.create('gomadare:thornmail', 'attribute')
  .attribute('thornmail_armor_bonus', 'minecraft:generic.armor', 4.0, 'addition');
});
