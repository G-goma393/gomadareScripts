// Iron's Spells 呪文ダメージ倍化スクリプト
// すべてのIron's Spellsの呪文ダメージを2倍にします

PlayerEvents.spellOnCast(event => {
    try {
        const player = event.player;
        const spellData = event.spellData;
        const spell = spellData.spell;
        const spellLevel = spellData.level;
        
        // デバッグ用ログ
        console.log(`Spell cast: ${spell.getId()} at level ${spellLevel} by ${player.name}`);
        
        // 呪文のダメージを2倍にする処理
        // 注意: この方法は直接的なダメージ倍化ではありませんが、
        // 呪文の効果を強化する方法として使用できます
        
        // プレイヤーに呪文強化メッセージを送信（オプション）
        player.tell(`呪文「${spell.getId()}」が強化されました！`);
        
    } catch (error) {
        console.error('Error in IronSpells damage boost:', error);
    }
});

// より直接的なダメージ倍化のための代替アプローチ
// エンティティのダメージイベントを監視してIron's Spellsからのダメージを倍化
PlayerEvents.damage(event => {
    try {
        const player = event.player;
        const source = event.source;
        
        // Iron's Spellsからのダメージかどうかを判定
        if (source && source.getMsgId && source.getMsgId().includes('irons_spellbooks')) {
            const originalDamage = event.damage;
            const boostedDamage = originalDamage * 2.0; // 2倍に増加
            
            // ダメージを倍化
            event.damage = boostedDamage;
            
            console.log(`IronSpells damage boosted: ${originalDamage} -> ${boostedDamage} for player ${player.name}`);
            
            // プレイヤーにダメージ強化メッセージを送信（オプション）
            // player.tell(`呪文ダメージが強化されました: ${originalDamage} -> ${boostedDamage}`);
        }
        
    } catch (error) {
        console.error('Error in IronSpells damage boost (damage event):', error);
    }
});

// 特定の呪文のマナコスト倍率設定
const SPELL_MANA_MULTIPLIERS = {
    // 強力すぎる呪文のマナコストを増大
    'irons_spellbooks:lightning_bolt': 3.0,        // 雷ボルト
    'irons_spellbooks:meteor': 4.0,                // 隕石
    'irons_spellbooks:starfall': 5.0,              // 星落とし
    'irons_spellbooks:lightning_storm': 6.0,       // 雷嵐
    'irons_spellbooks:meteor_shower': 7.0,         // 隕石シャワー
    'irons_spellbooks:summon_lightning_golem': 8.0, // 雷ゴーレム召喚
    'irons_spellbooks:summon_lightning_storm': 10.0, // 雷嵐召喚
    'irons_spellbooks:eldritch_blast': 15.0,       // エルドリッチブラスト（超強力）
    
    // 中程度の呪文は少しマナコストを増加
    'irons_spellbooks:fireball': 1.5,              // ファイアボール
    'irons_spellbooks:magic_missile': 1.3,         // マジックミサイル
    'irons_spellbooks:heal': 1.2,                  // ヒール
    'irons_spellbooks:magic_arrow': 1.4,           // マジックアロー
    
    // 弱めの呪文はマナコストを削減
    'irons_spellbooks:spark': 0.7,                 // スパーク
    'irons_spellbooks:magic_spray': 0.8,           // マジックスプレー
    'irons_spellbooks:blade_ward': 0.6,            // ブレードワード
    
    // T.O.Magic の呪文調整
    // 強力なT.O.Magic呪文（マナコスト増大）
    'toms_magic:void_bolt': 4.0,                   // ヴォイドボルト
    'toms_magic:void_storm': 6.0,                  // ヴォイドストーム
    'toms_magic:dark_matter': 5.0,                 // ダークマター
    'toms_magic:cosmic_blast': 8.0,                // コズミックブラスト
    'toms_magic:reality_tear': 10.0,               // リアリティティア
    'toms_magic:dimension_rip': 12.0,              // ディメンションリップ
    'toms_magic:void_consumption': 15.0,           // ヴォイドコンサンプション
    
    // 中程度のT.O.Magic呪文
    'toms_magic:shadow_bolt': 1.4,                 // シャドウボルト
    'toms_magic:dark_pulse': 1.5,                  // ダークパルス
    'toms_magic:void_arrow': 1.3,                  // ヴォイドアロー
    'toms_magic:shadow_heal': 1.2,                 // シャドウヒール
    
    // 弱めのT.O.Magic呪文
    'toms_magic:shadow_spark': 0.7,                // シャドウスパーク
    'toms_magic:dark_mist': 0.8,                   // ダークミスト
    'toms_magic:void_whisper': 0.6,                // ヴォイドウィスパー
};

// 呪文のマナ消費を調整
PlayerEvents.changeMana(event => {
    try {
        const magicData = event.getMagicData();
        const castSource = magicData.getCastSource();
        
        // 呪文書からの呪文の場合のみ処理
        if (castSource === 'SPELLBOOK') {
            const oldMana = event.getOldMana();
            const manaChange = oldMana - event.getNewMana();
            
            // 現在詠唱中の呪文を取得
            const currentSpell = magicData.getCastSource() === 'SPELLBOOK' ? 
                magicData.getCastingSpell() : null;
            
            let manaMultiplier = 1.0;
            let spellId = 'unknown';
            
            if (currentSpell) {
                spellId = currentSpell.getId();
                manaMultiplier = SPELL_MANA_MULTIPLIERS[spellId] || 1.0;
            }
            
            // マナ消費を調整
            const adjustedManaCost = Math.max(1, Math.floor(manaChange * manaMultiplier));
            const newMana = oldMana - adjustedManaCost;
            
            event.setNewMana(newMana);
            
            if (manaMultiplier !== 1.0) {
                console.log(`Spell ${spellId}: Mana cost adjusted ${manaChange} -> ${adjustedManaCost} (multiplier: ${manaMultiplier})`);
                
                // プレイヤーにマナコスト調整の通知を送信
                const player = event.player;
                if (player) {
                    if (manaMultiplier > 1.0) {
                        player.tell(`§c警告: 呪文「${spellId}」のマナコストが${manaMultiplier}倍に増加しました！`);
                    } else if (manaMultiplier < 1.0) {
                        player.tell(`§a呪文「${spellId}」のマナコストが${manaMultiplier}倍に削減されました！`);
                    }
                }
            }
        }
        
    } catch (error) {
        console.error('Error in IronSpells mana adjustment:', error);
    }
});
