// WeaponMaster 物理防御貫通ユーティリティ
// L2Hostilityのボス特性による防御力上昇に対抗するための調整

// WeaponMasterの武器アイテムID（例：実際のIDに合わせて調整してください）
const WEAPONMASTER_WEAPONS = [
    'weaponmaster:iron_sword',
    'weaponmaster:diamond_sword',
    'weaponmaster:netherite_sword',
    'weaponmaster:iron_axe',
    'weaponmaster:diamond_axe',
    'weaponmaster:netherite_axe',
    'weaponmaster:iron_spear',
    'weaponmaster:diamond_spear',
    'weaponmaster:netherite_spear',
    'weaponmaster:iron_hammer',
    'weaponmaster:diamond_hammer',
    'weaponmaster:netherite_hammer',
    // 他のWeaponMaster武器も追加可能
];

// 防御貫通の効果設定
const DEFENSE_PENETRATION_CONFIG = {
    basePenetration: 0.3,        // 基本防御貫通率（30%）
    maxPenetration: 0.8,         // 最大防御貫通率（80%）
    penetrationPerLevel: 0.05,   // レベルあたりの防御貫通増加（5%）
};

// プレイヤーの攻撃ダメージイベントを監視
PlayerEvents.damage(event => {
    try {
        const player = event.player;
        const target = event.target;
        const source = event.source;
        
        // プレイヤーが攻撃者で、ターゲットがモブの場合のみ処理
        if (!player || !target || player === target) return;
        
        // WeaponMasterの武器を持っているかチェック
        const mainHandItem = player.getMainHandItem();
        if (!mainHandItem || !mainHandItem.id) return;
        
        const itemId = mainHandItem.id.toString();
        const isWeaponMasterWeapon = WEAPONMASTER_WEAPONS.some(weaponId => 
            itemId.includes(weaponId.replace('weaponmaster:', ''))
        );
        
        if (!isWeaponMasterWeapon) return;
        
        // ターゲットがモブかどうかチェック
        if (!target.isMob()) return;
        
        // ターゲットのL2Hostility特性レベルを取得
        const l2Cap = L2Hostility.of(target);
        if (!l2Cap) return;
        
        // 特性レベルに基づいて防御貫通率を計算
        const totalTraitLevels = l2Cap.getTraitLevels().reduce((sum, level) => sum + level, 0);
        const penetrationRate = Math.min(
            DEFENSE_PENETRATION_CONFIG.basePenetration + 
            (totalTraitLevels * DEFENSE_PENETRATION_CONFIG.penetrationPerLevel),
            DEFENSE_PENETRATION_CONFIG.maxPenetration
        );
        
        if (penetrationRate > 0) {
            // ダメージを増加（防御貫通効果）
            const originalDamage = event.damage;
            const penetrationBonus = originalDamage * penetrationRate;
            const finalDamage = originalDamage + penetrationBonus;
            
            event.damage = finalDamage;
            
            // ログ出力
            console.log(`WeaponMaster defense penetration: ${originalDamage} -> ${finalDamage} (${(penetrationRate * 100).toFixed(1)}% penetration) vs ${target.name}`);
            
            // プレイヤーに防御貫通の通知（オプション）
            if (Math.random() < 0.1) { // 10%の確率で通知
                player.tell(`§6WeaponMaster: ${(penetrationRate * 100).toFixed(1)}% 防御貫通！`);
            }
        }
        
    } catch (error) {
        console.error('Error in WeaponMaster defense penetration:', error);
    }
});

// エンティティの攻撃イベントも監視（より確実な検出のため）
PlayerEvents.attack(event => {
    try {
        const player = event.player;
        const target = event.target;
        
        if (!player || !target) return;
        
        // WeaponMasterの武器を持っているかチェック
        const mainHandItem = player.getMainHandItem();
        if (!mainHandItem || !mainHandItem.id) return;
        
        const itemId = mainHandItem.id.toString();
        const isWeaponMasterWeapon = WEAPONMASTER_WEAPONS.some(weaponId => 
            itemId.includes(weaponId.replace('weaponmaster:', ''))
        );
        
        if (!isWeaponMasterWeapon) return;
        
        // ターゲットがモブでL2Hostility特性を持っているかチェック
        if (!target.isMob()) return;
        
        const l2Cap = L2Hostility.of(target);
        if (!l2Cap) return;
        
        const totalTraitLevels = l2Cap.getTraitLevels().reduce((sum, level) => sum + level, 0);
        
        if (totalTraitLevels > 0) {
            // プレイヤーに攻撃強化の視覚効果を追加（オプション）
            player.tell(`§eWeaponMaster vs L2Hostility特性: ${totalTraitLevels}レベル`);
        }
        
    } catch (error) {
        console.error('Error in WeaponMaster attack event:', error);
    }
});

// プレイヤーのアイテム使用イベントでWeaponMaster武器の情報を表示
PlayerEvents.itemUse(event => {
    try {
        const player = event.player;
        const item = event.item;
        
        if (!item || !item.id) return;
        
        const itemId = item.id.toString();
        const isWeaponMasterWeapon = WEAPONMASTER_WEAPONS.some(weaponId => 
            itemId.includes(weaponId.replace('weaponmaster:', ''))
        );
        
        if (isWeaponMasterWeapon) {
            // WeaponMaster武器の情報を表示（初回のみ）
            const weaponName = itemId.split(':')[1] || 'Unknown';
            player.tell(`§bWeaponMaster武器「${weaponName}」: L2Hostility特性に防御貫通効果あり`);
        }
        
    } catch (error) {
        console.error('Error in WeaponMaster item use event:', error);
    }
});
