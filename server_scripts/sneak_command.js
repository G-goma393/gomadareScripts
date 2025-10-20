// /sneak コマンド - プレイヤーに透明化のポーションエフェクトを3分間付与

ServerEvents.command(event => {
    const { server, sender } = event;
    
    // /sneak コマンドを登録（OP権限不要）
    event.register('sneak', 'プレイヤーに透明化のポーションエフェクトを3分間付与します', (builder) => {
        builder.executes((context) => {
            const player = context.source.player;
            
            if (!player) {
                context.source.sendFailure('このコマンドはプレイヤーのみが実行できます。');
                return 0;
            }
            
            try {
                // 透明化のポーションエフェクトを付与
                // レベル1、時間は180秒（3分間）
                player.addEffect('minecraft:invisibility', 180, 1, false, false);
                
                // プレイヤーに成功メッセージを送信
                player.tell('透明化のポーションエフェクトが3分間付与されました。');
                
                console.log(`Player ${player.name} received invisibility effect via /sneak command`);
                return 1; // 成功
                
            } catch (error) {
                console.error('Error in /sneak command:', error);
                player.tell('エラーが発生しました。');
                return 0; // 失敗
            }
        });
    }).requires(ctx => true); // すべてのプレイヤーが実行可能（OP権限不要）
});

// 代替実装（Commands API使用 - OP権限不要）
Commands.register('sneak_alt', 'プレイヤーに透明化のポーションエフェクトを3分間付与します（代替実装）', (ctx) => {
    const player = ctx.source.player;
    
    if (!player) {
        ctx.source.sendFailure('このコマンドはプレイヤーのみが実行できます。');
        return;
    }
    
    try {
        // 透明化のポーションエフェクトを付与
        player.addEffect('minecraft:invisibility', 180, 1, false, false);
        
        // プレイヤーに成功メッセージを送信
        player.tell('透明化のポーションエフェクトが3分間付与されました。');
        
        console.log(`Player ${player.name} received invisibility effect via /sneak_alt command`);
        
    } catch (error) {
        console.error('Error in /sneak_alt command:', error);
        player.tell('エラーが発生しました。');
    }
}).requires(ctx => true); // すべてのプレイヤーが実行可能（OP権限不要）
