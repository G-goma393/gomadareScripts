ServerEvents.tags('item', event => {
  // startup_scriptで作成した'gomadare:thornmail'アイテムを
  // L2Hostilityの特性アイテムとしてタグ付けする
  event.add('l2hostility:trait_item', 'gomadare:thornmail');
});