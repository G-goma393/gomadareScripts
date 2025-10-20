// /hunger コマンド - プレイヤーに空腹のポーションエフェクトを付与

ServerEvents.command(event => {
    const { server, sender } = event;
    
    // /hunger コマンドを登録（OP権限不要）
    event.register('hunger', 'プレイヤーに空腹のポーションエフェクトを付与します', (builder) => {
        builder.executes((context) => {
            const player = context.source.player;
            
            if (!player) {
                context.source.sendFailure('このコマンドはプレイヤーのみが実行できます。');
                return 0;
            }
            
            try {
                // 空腹のポーションエフェクトを付与
                // レベル1、時間は999999秒（約11.5日間）で実質永続
                player.addEffect('minecraft:hunger', 999999, 1, false, false);
                
                // プレイヤーに成功メッセージを送信
                player.tell('空腹のポーションエフェクトが付与されました。');
                
                console.log(`Player ${player.name} received hunger effect via /hunger command`);
                return 1; // 成功
                
            } catch (error) {
                console.error('Error in /hunger command:', error);
                player.tell('エラーが発生しました。');
                return 0; // 失敗
            }
        });
    }).requires(ctx => true); // すべてのプレイヤーが実行可能（OP権限不要）
});

// 代替実装（Commands API使用 - OP権限不要）
Commands.register('hunger_alt', 'プレイヤーに空腹のポーションエフェクトを付与します（代替実装）', (ctx) => {
    const player = ctx.source.player;
    
    if (!player) {
        ctx.source.sendFailure('このコマンドはプレイヤーのみが実行できます。');
        return;
    }
    
    try {
        // 空腹のポーションエフェクトを付与
        player.addEffect('minecraft:hunger', 999999, 1, false, false);
        
        // プレイヤーに成功メッセージを送信
        player.tell('空腹のポーションエフェクトが付与されました。');
        
        console.log(`Player ${player.name} received hunger effect via /hunger_alt command`);
        
    } catch (error) {
        console.error('Error in /hunger_alt command:', error);
        player.tell('エラーが発生しました。');
    }
}).requires(ctx => true); // すべてのプレイヤーが実行可能（OP権限不要）
