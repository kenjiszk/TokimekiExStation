enchant();

var winHeight = window.innerHeight;

// music
// shinkei
var audio_back = new Audio('cosmo.mp3');
var audio_flush = new Audio('flush_back.mp3');
var audio_baby = new Audio('hey_baby.mp3');
var audio_setagaya = new Audio('setagaya.mp3');
var Game_Music = -1;
// shooting
var audio_gurasura = new Audio('shooting/gurasura.mp3');
var audio_hutari = new Audio('shooting/hutari.mp3');
var audio_yozora = new Audio('shooting/yozora.mp3');
var Shooting_Game_Music = Math.floor(3*Math.random());

var width = 640;
var height = 820;
if (winHeight >= 548){
    height = 996;
}

// READONLY CONSTANTS
var ICON_WIDTH = 144;
var ICON_HEIGHT = 170;
var USA_ICON_WIDTH = 200;
var USA_ICON_HEIGHT = 300;
var CARD_NUM_WIDTH = 250;
var CARD_NUM_HEIGHT = 100;
var GAME1_START_WIDTH = 500;
var GAME1_START_HEIGHT = 200;
var WHICH_USA_WIDTH = 640;
var WHICH_USA_HEIGHT = 80;
var POINT_WIDTH = 560;
var POINT_HEIGHT=56;
var CARD_WIDTH = 160;
var CARD_HEIGHT = 235;
var CARD_HEIGHT32 = 117;
var BOARD_WIDTH = CARD_WIDTH*4;
var BOARD_HEIGHT = CARD_HEIGHT*4;
var YOU_POINT_X = 170;
var USA_POINT_X = 430;
var POINT_NUM_WIDTH = 100;

if (height == 820) {
var CARD_HEIGHT = 193;
var CARD_HEIGHT32 = 96;
var BOARD_WIDTH = CARD_WIDTH*4;
var BOARD_HEIGHT = CARD_HEIGHT*4;
}

// CONSTANTS
var SelectedUsa = 1;
var SelectedCardNum = 16;
var YouPointNum = 0;
var UsaPointNum = 0;
var Touched_Num = -1;
var Card_Closed = -1;
var First_Card_Num = -1;
var Second_Card_Num = -1;
var Card_Get = -1;
var Card_Reset = -1;
var Change_Motion = -1;
var Your_Turn = 1;
var Usa_Card_Num = 0;
var Usa_Moving = -1;
var Your_Point = 0;
var Usa_Point = 0;

function init_const() {
    SelectedUsa = 1;
    SelectedCardNum = 16;
    YouPointNum = 0;
    UsaPointNum = 0;
    Touched_Num = -1;
    Card_Closed = -1;
    First_Card_Num = -1;
    Second_Card_Num = -1;
    Card_Get = -1;
    Card_Reset = -1;
    Change_Motion = -1;
    Your_Turn = 1;
    Usa_Card_Num = 0;
    Usa_Moving = -1;
    Your_Point = 0;
    Usa_Point = 0;
}

Touch = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 500, 112);
        this.image = game.assets['touch.png'];
        this.back = 0;
        this.count = 0;
        this.x = (width - 500)/2;
        this.y = (height - 112)/2;
        this.addEventListener('enterframe', function() {
            if(this.count%10 == 0) {
                if (this.back == 0) {
                    this.image = game.assets['touch_back.png'];
                    this.back = 1;
                } else {
                    this.image = game.assets['touch.png'];
                    this.back = 0;
                }
            }
            this.count++;
		});
	}
});

Card1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_WIDTH, CARD_HEIGHT);
        if (height == 820) {
            this.image = game.assets['card_front_s_ip4.png'];
        } else{
            this.image = game.assets['card_front_s.png'];
        }
		this.who;
		this.addEventListener('touchstart', function() {
			if (Touched_Num == -1 && Your_Turn == 1) {
				Touched_Num = this.who;
				if (First_Card_Num == -1) {
					First_Card_Num = this.who;
				} else if (Second_Card_Num == -1) {
					Second_Card_Num = this.who;
				}
			}
		});
	}
});

Card1_back = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_WIDTH, CARD_HEIGHT);
        if (height == 820) {
            this.image = game.assets['card1_back_s_ip4.png'];
        } else {
            this.image = game.assets['card1_back_s.png'];
        }
		this.addEventListener('touchstart', function() {
		});
	}
});

Card32 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_WIDTH, CARD_HEIGHT32);
        if (height == 820) {
            this.image = game.assets['card_front_s_32_ip4.png'];
        } else {
            this.image = game.assets['card_front_s_32.png'];
        }
		this.who;
		this.addEventListener('touchstart', function() {
			if (Touched_Num == -1 && Your_Turn == 1) {
				Touched_Num = this.who;
				if (First_Card_Num == -1) {
					First_Card_Num = this.who;
				} else if (Second_Card_Num == -1) {
					Second_Card_Num = this.who;
				}
			}
		});
	}
});

Card32_back = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_WIDTH, CARD_HEIGHT32);
        if (height == 820) {
            this.image = game.assets['card1_back_s_32_ip4.png'];
        } else {
            this.image = game.assets['card1_back_s_32.png'];
        }
		this.addEventListener('touchstart', function() {
		});
	}
});

Train = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 500, 250);
		this.image = game.assets['train_s.png'];
		this.x = width;
		this.y = height/2;
		this.addEventListener('enterframe', function() {
			this.x -= width/20;
		});
	}
});

Usa1 = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 150, 200);
		this.image = game.assets['enemy_usa1.png'];
		this.addEventListener('enterframe', function() {
		});
	}
});

Icon = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, ICON_WIDTH, ICON_HEIGHT);
	}
});

UsaIcon = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, USA_ICON_WIDTH, USA_ICON_HEIGHT);
        this.addEventListener('touchstart', function() {
            SelectedUsa = this.num;
		});
	}
});

CardNumIcon = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_NUM_WIDTH, CARD_NUM_HEIGHT);
        this.addEventListener('touchstart', function() {
            SelectedCardNum = this.num;
		});
	}
});

UsaIconSelected = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, USA_ICON_WIDTH, USA_ICON_HEIGHT);
        this.image = game.assets['selected1.png'];
        this.color = "red";
        this.num = 1;
		this.addEventListener('enterframe', function() {
            if(this.color == "red") {
                this.image = game.assets['selected2.png'];
                this.color = "yellow";
            } else {
                this.image = game.assets['selected1.png'];
                this.color = "red";
            }
		});
        this.addEventListener('touchstart', function() {
            SelectedUsa = this.num;
		});
	}
});

CardNumIconSelected = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, CARD_NUM_WIDTH, CARD_NUM_HEIGHT);
        this.image = game.assets['selected_card1.png'];
        this.color = "red";
        this.num = 1;
		this.addEventListener('enterframe', function() {
            if(this.color == "red") {
                this.image = game.assets['selected_card2.png'];
                this.color = "yellow";
            } else {
                this.image = game.assets['selected_card1.png'];
                this.color = "red";
            }
		});
        this.addEventListener('touchstart', function() {
            SelectedCardNum = this.num;
		});
	}
});

Game1Start = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, GAME1_START_WIDTH, GAME1_START_HEIGHT);
        this.image = game.assets['game1_start.png'];
        this.x = (width-GAME1_START_WIDTH)/2;
        this.y = height-GAME1_START_HEIGHT-10;
	}
});

GameOver = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 500, 667);
        this.x = (width-500)/2;
        this.y = (height-667)/2;
        this.addEventListener('touchstart', function() {
            init_const();
            if(!audio_baby.ended && Game_Music == 1){
                audio_baby.pause();
                audio_baby.currentTime = 0;
            }
            if(!audio_flush.ended && Game_Music == 0){
                audio_flush.pause();
                audio_flush.currentTime = 0;
            }
            if(!audio_setagaya.ended && Game_Music == 2){
                audio_setagaya.pause();
                audio_setagaya.currentTime = 0;
            }
            game.replaceScene(game.menuScene());
		});
	}
});

Icon_Back = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 61, 56);
        this.image = game.assets['back.png'];
        this.x = (width-61);
        this.y = 0;
        this.addEventListener('touchstart', function() {
            init_const();
            if(!audio_baby.ended && Game_Music == 1){
                audio_baby.pause();
                audio_baby.currentTime = 0;
            }
            if(!audio_flush.ended && Game_Music == 0){
                audio_flush.pause();
                audio_flush.currentTime = 0;
            }
            if(!audio_setagaya.ended && Game_Music == 2){
                audio_setagaya.pause();
                audio_setagaya.currentTime = 0;
            }
            game.replaceScene(game.menuScene());
		});
	}
});


function unopend_card_num(card_usa_think, card_opend, card1_num) {
    var difficult_mode = "";
    if (SelectedUsa == 1) {
        difficult_mode = 0;
    } else if (SelectedUsa == 2) {
        difficult_mode = Math.random() < 0.4 ? 1 : 0;
        console.log(difficult_mode);
    } else if (SelectedUsa == 3) {
        difficult_mode = 1;
    }

    if (difficult_mode == 1) {
		for (var i = 0; i < SelectedCardNum; i++) {
			if (card_usa_think[i] == 1) {
				for (var j = 0; j < SelectedCardNum; j++) {
					if (i != j && card_usa_think[j] == 1) {
						if (Math.floor(card1_num[i]/2) == Math.floor(card1_num[j]/2)) {
							if (card_opend[i] != 1) {
								return i;
							} else {
								return j;
							}
						}
					}
				}
			}
		}
	}
	var rand = (Math.floor(Math.random()*SelectedCardNum));
	while (card_opend[rand] == 1 || rand == First_Card_Num) {
		rand = (Math.floor(Math.random()*SelectedCardNum));
	}
	return rand;
}

window.onload = function() {
	var game = new Game(width, height);
    console.log(width, height);
	game.fps = 30;
    // for shinkeisuijaku
	game.preload('card_front_s.png', 'card_front_s_32.png', 'card1_back_s_32.png',
     'card1_back_s.png', 'train_s.png', 'usa_s.png', 'top_sample.png', 'icon_shinkei.png',
     'usa1.png', 'usa2.png', 'usa3.png', 'selected1.png', 'selected2.png', 'touch.png', 'touch_back.png',
     'card16.png', 'card32.png', 'selected_card1.png', 'selected_card2.png', 'game1_start.png',
     'back_sinkei.png', 'which_usa.png', 'which_card.png', 'point_back.png', 'points.png',
     'enemy_usa1.png', 'enemy_usa2.png', 'enemy_usa3.png', 'draw.png', 'you_win.png', 'you_lose.png',
     'icon_homepage.png', 'icon_facebook.png', 'icon_twitter.png', 'back.png',
     'card_front_s_ip4.png', 'card1_back_s_ip4.png', 'card_front_s_32_ip4.png', 'card1_back_s_32_ip4.png',
     'icon_hikari.png', 'icon_nozomi.png');
    // for shooting
    game.preload('shooting/fire_me.png', 'shooting/fire_enemy.png',
    'shooting/shooting_back2.png', 'shooting/shooting_start.png',
    'shooting/shooting_game_over.png', 'shooting/shooting_clear.png', 'shooting/hikari.png', 'shooting/sakiwo.png',
    'shooting/shunsuke.png', 'shooting/shingo.png', 'shooting/airi.png', 'shooting/shingo_mini.png', 'shooting/airi_hat.png',
    'shooting/shooting_point.png','shooting/hikari_head.png','shooting/switch.png', 'shooting/hikari_head_light.png',
    'shooting/shooting_title.png', 'shooting/start_b.png', 'shooting/enemy_b.png', 'shooting/how_b.png', 'shooting/high_score.png',
    'shooting/q_pannel.png','shooting/hikari_pannel.png','shooting/usa_pannel.png','shooting/sakiwo_pannel.png',
    'shooting/shunsuke_pannel.png','shooting/shingo_pannel.png','shooting/airi_pannel.png', 'shooting/hikari_big_pannel.png',
    'shooting/usa_big_pannel.png', 'shooting/sakiwo_big_pannel.png', 'shooting/shunsuke_big_pannel.png', 'shooting/shingo_big_pannel.png',
    'shooting/airi_big_pannel.png', 'shooting/dead_ring.png', 'shooting/how_to_play.png', 'shooting/all_stage_clear.png',
    'shooting/enemy_usa1.png', 'shooting/enemy_usa2.png', 'shooting/enemy_usa3.png', 'shooting/hikari_big_fire_item.png');
	// for slidepazzle
	game.preload('slidepazzle/blank.png', 'slidepazzle/bottom_to_left.png', 'slidepazzle/bottom_to_right.png', 'slidepazzle/cross.png', 'slidepazzle/horizontal.png', 'slidepazzle/vertical.png', 'slidepazzle/top_to_left.png', 'slidepazzle/top_to_right.png', 'slidepazzle/no_road.png', 'slidepazzle/background.png', 'slidepazzle/nozomi.png', 'slidepazzle/slidepazzle_clear.png', 'slidepazzle/slidepazzle_gameover.png', 'slidepazzle/slidepazzle_title.png', 'slidepazzle/slidepazzle_point.png', 'slidepazzle/slidepazzle_clear_stage.png', 'slidepazzle/slidepazzle_howto.png', 'slidepazzle/slidepazzle_start.png', 'slidepazzle/slidepazzle_top_rail.png', 'slidepazzle/slidepazzle_highscore.png', 'slidepazzle/slidepazzle_stage_no.png', 'slidepazzle/slidepazzle_speed.png', 'slidepazzle/slidepazzle_point_white.png', 'slidepazzle/slidepazzle_howto_back.png', 'slidepazzle/slidepazzle_menu_hand.png');
	game.onload = function() {
        audio_back.play();
		game.pushScene(game.topScene());
	};

	game.topScene = function() {
        game.fps = 30;
		var scene = new Scene();
		var bg = new Sprite(width, height);
		bg.image = game.assets['top_sample.png'];
		scene.addChild(bg);
        
        var top = new Touch();
        scene.addChild(top);

		scene.addEventListener(Event.TOUCH_START, function(e) {
			game.replaceScene(game.menuScene());
		});
        
        scene.addEventListener('enterframe', function(e) {
            if(audio_back.ended || audio_back.paused){
                audio_back.play();
            }
        });
        
		return scene;
	}

	game.menuScene = function(){
        game.fps = 30;
		var scene = new Scene();
		var bg = new Sprite(width, height);
		bg.image = game.assets['top_sample.png'];
		scene.addChild(bg);
        
        var icon_homepage = new Icon();
        icon_homepage.image = game.assets['icon_homepage.png'];
        icon_homepage.x = Math.floor((width-3*ICON_WIDTH)/4) + width;
        icon_homepage.y = Math.floor(height/3);
        scene.addChild(icon_homepage);
        
        var icon_facebook = new Icon();
        icon_facebook.image = game.assets['icon_facebook.png'];
        icon_facebook.x = icon_homepage.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
        icon_facebook.y = Math.floor(height/3);
        scene.addChild(icon_facebook);
        
        var icon_twitter= new Icon();
        icon_twitter.image = game.assets['icon_twitter.png'];
        icon_twitter.x = icon_facebook.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
        icon_twitter.y = Math.floor(height/3);
        scene.addChild(icon_twitter);

        var icon_shinkei = new Icon();
        icon_shinkei.image = game.assets['icon_shinkei.png'];
        icon_shinkei.x = icon_homepage.x;
        icon_shinkei.y = icon_homepage.y + ICON_HEIGHT;
        scene.addChild(icon_shinkei);
        
        var icon_shooting = new Icon();
        icon_shooting.image = game.assets['icon_hikari.png'];
        icon_shooting.x = icon_facebook.x;
        icon_shooting.y = icon_facebook.y + ICON_HEIGHT;
        scene.addChild(icon_shooting);
        
        var icon_slidepazzle = new Icon();
        icon_slidepazzle.image = game.assets['icon_nozomi.png'];
        icon_slidepazzle.x = icon_twitter.x;
        icon_slidepazzle.y = icon_twitter.y + ICON_HEIGHT;
        scene.addChild(icon_slidepazzle);
        
        var is_icon_ready = 0;
        
        icon_homepage.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                window.open("http://tokimekiex.com/","_blank","")
            }
		});
        
        icon_facebook.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                window.open("https://m.facebook.com/tokimekiex","_blank","")
            }
		});
        
        icon_twitter.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                window.open("https://twitter.com/tokimekiex","_blank","")
            }
		});
        
        icon_shinkei.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                game.replaceScene(game.game1SelectScene());
            }
		});
        
        icon_shooting.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                game.replaceScene(game.game2SelectScene());
            }
		});
        
        icon_slidepazzle.addEventListener(Event.TOUCH_START, function(e) {
            if(is_icon_ready == 1){
                game.replaceScene(game.game3SelectScene());
            }
        });
        
        scene.addEventListener('enterframe', function() {
            if(audio_back.ended || audio_back.paused){
                audio_back.play();
            }
            
            if(is_icon_ready == 0) {
                icon_homepage.x = (icon_homepage.x - Math.floor((width-3*ICON_WIDTH)/4))/1.2;
                icon_facebook.x = icon_homepage.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
                icon_twitter.x = icon_facebook.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
                icon_shinkei.x = icon_homepage.x;
                icon_shooting.x = icon_facebook.x;
				icon_slidepazzle.x = icon_twitter.x;
				if((icon_homepage.x - Math.floor((width-3*ICON_WIDTH)/4)) <= 1) {
                    icon_homepage.x = Math.floor((width-3*ICON_WIDTH)/4);
                    icon_facebook.x = icon_homepage.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
                    icon_twitter.x = icon_facebook.x + Math.floor((width-3*ICON_WIDTH)/4) + ICON_WIDTH;
                    icon_shinkei.x = icon_homepage.x;
                    icon_shooting.x = icon_facebook.x;
					icon_slidepazzle.x = icon_twitter.x;
                    is_icon_ready = 1;
                }
            }
        });

		return scene;
	};
    
    game.game1SelectScene = function() {
        game.fps = 25;
        var scene = new Scene();
        
        var bg = new Sprite(width, height);
		bg.image = game.assets['back_sinkei.png'];
		scene.addChild(bg);
        
        var back = new Icon_Back();
        back.y = 10;
        scene.addChild(back);
        
        var which_usa = new Sprite(WHICH_USA_WIDTH-back.width, WHICH_USA_HEIGHT);
        which_usa.image = game.assets['which_usa.png'];
        scene.addChild(which_usa);
        
        var usa1_icon = new UsaIcon();
        usa1_icon.image = game.assets['usa1.png'];
        usa1_icon.x = (width-3*USA_ICON_WIDTH)/4;
        usa1_icon.y = WHICH_USA_HEIGHT;
        usa1_icon.num = 1;
        scene.addChild(usa1_icon);
        
        var usa2_icon = new UsaIcon();
        usa2_icon.image = game.assets['usa2.png'];
        usa2_icon.x = (width-3*USA_ICON_WIDTH)/4+USA_ICON_WIDTH;
        usa2_icon.y = WHICH_USA_HEIGHT;
        usa2_icon.num = 2;
        scene.addChild(usa2_icon);
        
        var usa3_icon = new UsaIcon();
        usa3_icon.image = game.assets['usa3.png'];
        usa3_icon.x = (width-3*USA_ICON_WIDTH)/4+2*USA_ICON_WIDTH;
        usa3_icon.y = WHICH_USA_HEIGHT;
        usa3_icon.num = 3;
        scene.addChild(usa3_icon);

        SelectedUsa = 1;
        var selected_frame = new UsaIconSelected();
        selected_frame.x = usa1_icon.x;
        selected_frame.y = usa1_icon.y;
        scene.addChild(selected_frame);

        var which_card = new Sprite(WHICH_USA_WIDTH, WHICH_USA_HEIGHT);
        which_card.image = game.assets['which_card.png'];
        which_card.y = WHICH_USA_HEIGHT+USA_ICON_HEIGHT+50;
        scene.addChild(which_card);
        
        var card_num_icon16 = new CardNumIcon();
        card_num_icon16.image = game.assets['card16.png'];
        card_num_icon16.x = (width-2*CARD_NUM_WIDTH)/3;
        card_num_icon16.y = WHICH_USA_HEIGHT+USA_ICON_HEIGHT+50+WHICH_USA_HEIGHT;
        card_num_icon16.num = 16;
        scene.addChild(card_num_icon16);
        
        var card_num_icon32 = new CardNumIcon();
        card_num_icon32.image = game.assets['card32.png'];
        card_num_icon32.x = (width-2*CARD_NUM_WIDTH)/3 + CARD_NUM_WIDTH;
        card_num_icon32.y = WHICH_USA_HEIGHT+USA_ICON_HEIGHT+50+WHICH_USA_HEIGHT;
        card_num_icon32.num = 32;
        scene.addChild(card_num_icon32);
        
        var selected_card_frame = new CardNumIconSelected();
        SelectedCardNum == 16
        selected_card_frame.x = card_num_icon16.x;
        selected_card_frame.y = card_num_icon16.y;
        scene.addChild(selected_card_frame);
        
        scene.addEventListener('enterframe', function() {
            if(audio_back.ended || audio_back.paused){
                audio_back.play();
            }
        
            if (SelectedUsa == 1) {
                selected_frame.x = usa1_icon.x;
                selected_frame.y = usa1_icon.y;
            } else if (SelectedUsa == 2) {
                selected_frame.x = usa2_icon.x;
                selected_frame.y = usa2_icon.y;
            } else if (SelectedUsa == 3) {
                selected_frame.x = usa3_icon.x;
                selected_frame.y = usa3_icon.y;
            }
            
            if (SelectedCardNum == 16) {
                selected_card_frame.x = card_num_icon16.x;
                selected_card_frame.y = card_num_icon16.y;
            } else if (SelectedCardNum == 32) {
                selected_card_frame.x = card_num_icon32.x;
                selected_card_frame.y = card_num_icon32.y;
            }
        });
        
        var start_button = new Game1Start();
        scene.addChild(start_button);
        start_button.addEventListener(Event.TOUCH_START, function(e) {
            audio_back.pause();
            audio_back.currentTime = 0;
			game.replaceScene(game.game1Scene());
		});
        
        return scene;
    };

	game.game1Scene = function() {
        game.fps = 25;
        Game_Music = Math.floor(Math.random()*3);
        if(Game_Music == 0) {
            audio_flush.play();
        } else if (Game_Music == 1) {
            audio_baby.play();
        } else {
            audio_setagaya.play();
        }        
        
        var scene = new Scene();
		var bg = new Sprite(width, height);
		bg.image = game.assets['back_sinkei.png'];
		scene.addChild(bg);
        
        var back = new Icon_Back();
        scene.addChild(back);
        
        var card_opend = new Array(SelectedCardNum);
        var card_usa_think = new Array(SelectedCardNum);
        var card1_num = new Array(SelectedCardNum);
		
		var card1 = new Array(SelectedCardNum);
		var card1_back = new Array(SelectedCardNum);
		
		for (var i = 0; i < SelectedCardNum; i++) {
			card1_num[i] = i;
			card_opend[i] = 0;
			card_usa_think[i] = 0;
		}
		card1_num.sort(
            function() {
                return Math.random() - 0.5;
            }
		);
        
        var point_back = new Sprite(POINT_WIDTH, POINT_HEIGHT);
        point_back.image = game.assets['point_back.png'];
        scene.addChild(point_back);
        
        var you_point = new Sprite(POINT_NUM_WIDTH, POINT_HEIGHT);
        you_point.image = game.assets['points.png'];
        you_point.x = YOU_POINT_X;
        you_point.frame = YouPointNum;
        scene.addChild(you_point);
        
        var Usa_Point = new Sprite(POINT_NUM_WIDTH, POINT_HEIGHT);
        Usa_Point.image = game.assets['points.png'];
        Usa_Point.x = USA_POINT_X;
        Usa_Point.frame = UsaPointNum;
        scene.addChild(Usa_Point);
        
		var train = new Train();
        var usa = new Usa1();
        if (SelectedUsa == 3) {
            usa.image = game.assets['enemy_usa3.png'];
        } else if (SelectedUsa == 2) {
            usa.image = game.assets['enemy_usa2.png'];
        }
        
		var usa_next_posision = -1;
		var usa_first = -1;

		for (var i = 0; i < SelectedCardNum; i++) {
            if (SelectedCardNum == 32) {
                card1[i] = new Card32();
                card1[i].x = CARD_WIDTH * (i % (BOARD_WIDTH/CARD_WIDTH));
                card1[i].y = CARD_HEIGHT32 * Math.floor(i / (BOARD_WIDTH/CARD_WIDTH))+POINT_HEIGHT;
                card1_back[i] = new Card32_back();
                card1_back[i].x = CARD_WIDTH * (i % (BOARD_WIDTH/CARD_WIDTH));
                card1_back[i].y = CARD_HEIGHT32 * Math.floor(i / (BOARD_WIDTH/CARD_WIDTH))+POINT_HEIGHT;
            } else {
                card1[i] = new Card1();
                card1[i].x = CARD_WIDTH * (i % (BOARD_WIDTH/CARD_WIDTH));
                card1[i].y = CARD_HEIGHT * Math.floor(i / (BOARD_WIDTH/CARD_WIDTH))+POINT_HEIGHT;
                card1_back[i] = new Card1_back();
                card1_back[i].x = CARD_WIDTH * (i % (BOARD_WIDTH/CARD_WIDTH));
                card1_back[i].y = CARD_HEIGHT * Math.floor(i / (BOARD_WIDTH/CARD_WIDTH))+POINT_HEIGHT;

            }
			card1[i].who = i;
			card1[i].frame = card1_num[i];
			scene.addChild(card1[i]);

			card1_back[i].scaleX = 0;
			card1_back[i].frame = card1_num[i];
			scene.addChild(card1_back[i]);
		}
        
        var over = new GameOver();
        var is_over = 0;
        
        
		scene.addEventListener('enterframe', function() {
            if(Game_Music == 0) {
                if (audio_flush.ended || audio_flush.paused) { audio_flush.play() };
            } else if (Game_Music == 1) {
                if (audio_baby.ended || audio_baby.paused) { audio_baby.play() };
            } else {
                if (audio_setagaya.ended || audio_setagaya.paused) { audio_setagaya.play() };
            }

            if ((YouPointNum + UsaPointNum) == (SelectedCardNum/2) || is_over == 1) {
                if (is_over == 0) {
                    if (YouPointNum > UsaPointNum) {
                        over.image = game.assets['you_win.png'];
                    } else if (YouPointNum < UsaPointNum) {
                        over.image = game.assets['you_lose.png'];
                    } else {
                        over.image = game.assets['draw.png'];
                    }
                    YouPointNum = 0;
                    UsaPointNum = 0;
                    Your_Turn = 1;
                    is_over = 1;

                    scene.addChild(over);
                }
			} else if (Usa_Moving == 2) {
				if (usa.rotation < 360) {
					usa.rotate(10);
					if (usa.rotation < 180){
						usa.y -= usa.y/10;
					} else {
						usa.y += usa.y/10;
					}
				} else {
					usa.rotation = 0;
					Usa_Moving = 1;
				}
			} else if (Change_Motion == 1) {
				scene.addChild(train);
				train.y = height/2;
				if (usa_first == -1) {
					scene.addChild(usa);
					usa_first = 1;
				}
				if (Usa_Moving == 0) {
					train.y = usa.y;
				} else {
					usa.x = train.x + train.width/3;
					usa.y = train.y - usa.width/2;
				}
				Change_Motion = 0;
			} else if (Change_Motion == 0) {
				if (train.x < -width) {
					train.x = width;
					scene.removeChild(train);
					Change_Motion = -1;
					if(Usa_Moving == 0) {
						Usa_Moving = -1;
						usa.rotation = 0;
						usa.x = train.x + train.width/3;
						usa.y = train.y - usa.width/2;
					}
				} else if (Usa_Moving == 0) {
					if (train.x < usa.x) {
						usa.rotate(10);
						usa.x = train.x;
						usa.y -= height/50;
					}
				} else if (usa.x > (width-usa.width)/2) {
					usa.x = train.x + train.width/3;
				} else {
					Usa_Moving = 2;
				}
			//ÉäÉZÉbÉgÉtÉâÉOóßÇ¡ÇƒÇΩèÍçáÇÕ
			} else if (Card_Reset == 1) {
				//ó†Ç™Ç›Ç¶Ç»Ç≠Ç»ÇÈÇ‹Ç≈ÇﬂÇ≠ÇÈ
				if(card1_back[First_Card_Num].scaleX >= 0.2) {
					card1_back[First_Card_Num].scaleX -= 0.2;
					card1_back[Second_Card_Num].scaleX -= 0.2;
					//ó†Ç™å©Ç¶Ç»Ç≠Ç»Ç¡ÇΩÇÁï\ÇÇﬂÇ≠ÇÈ
				} else if (card1[First_Card_Num].scaleX <= 0.8) {
					card1[First_Card_Num].scaleX += 0.2;
					card1[Second_Card_Num].scaleX += 0.2;
					// Ç®ÇÌÇ¡ÇΩÇÁÉäÉZÉbÉg
				} else {
                    card1_back[First_Card_Num].scaleX = 0;
                    card1_back[Second_Card_Num].scaleX = 0;
                    card1[First_Card_Num].scaleX = 1;
                    card1[Second_Card_Num].scaleX = 1;
					First_Card_Num = -1;
					Second_Card_Num = -1;
					Card_Reset = -1;
					Touched_Num = -1;
				}
			//ÉJÅ[ÉhÇ™É^ÉbÉ`Ç≥ÇÍÇƒÇ¢Ç»ÇØÇÍÇŒ
			} else if (Touched_Num != -1) {
				if (card_usa_think[Touched_Num] != 2) {
					card_usa_think[Touched_Num] = 1;
				}
				//ï\Ç™å©Ç¶Ç»Ç≠Ç»ÇÈÇ‹Ç≈
				if (card1[Touched_Num].scaleX >= 0.2) {
					card1[Touched_Num].scaleX -= 0.2;
				} else {
					//ó†Ç™äÆëSÇ…Ç›Ç¶ÇÈÇ‹Ç≈
					if (card1_back[Touched_Num].scaleX <= 0.8) {
						card1_back[Touched_Num].scaleX += 0.2;
					// 2ñáñ⁄Ç™ÇﬂÇ≠ÇÁÇÍÇÈ && 1ñáñ⁄Ç∆ÇQñáñ⁄Ç™àÍívÇµÇ»ÇØÇÍÇŒÉJÅ[ÉhÇ‡Ç«Ç∑
					} else if (Second_Card_Num != -1 && Math.floor(card1_num[First_Card_Num]/2) != Math.floor(card1_num[Second_Card_Num]/2)) {
						Card_Reset = 1;
						Change_Motion = 1;
						Your_Turn *= -1;
					if (Your_Turn != -1) {
							Usa_Moving = 0;
					}
					//ÇQñáñ⁄Ç™ÇﬂÇ≠ÇÁÇÍÇÈ && ÉJÅ[ÉhÇ™àÍív
					} else if (Second_Card_Num != -1 && Math.floor(card1_num[First_Card_Num]/2) == Math.floor(card1_num[Second_Card_Num]/2)) {
						card_opend[First_Card_Num] = 1;
						card_opend[Second_Card_Num] = 1;
						card_usa_think[First_Card_Num] = 2;
						card_usa_think[Second_Card_Num] = 2;
						Touched_Num = -1;
						First_Card_Num = -1;
						Second_Card_Num = -1;
                        if(Your_Turn == 1) {
                            YouPointNum ++;
                            you_point.frame = YouPointNum;
                        } else {
                            UsaPointNum ++;
                            Usa_Point.frame = UsaPointNum;
                        }
					} else {
						Touched_Num = -1;
					}
				}
			} else if (Your_Turn != 1) {
				if (Usa_Moving == 1) {
					if (usa_next_posision == -1) {
						usa_next_posision = unopend_card_num(card_usa_think, card_opend, card1_num);
					}
					if (Math.abs((card1[usa_next_posision].x + 50 - usa.x)) < 1) {
						usa.x = card1[usa_next_posision].x + 50;
					} else {
						usa.x += (card1[usa_next_posision].x + 50 - usa.x)/3;
					}
					if (Math.abs((card1[usa_next_posision].y - usa.y)) < 1) {
						usa.y = card1[usa_next_posision].y;
					} else {
						usa.y += (card1[usa_next_posision].y - usa.y)/3;
					}
					if ((usa.x == card1[usa_next_posision].x + 50) && (usa.y == card1[usa_next_posision].y)) {
						Usa_Moving = -1;
					}
				} else if (Usa_Card_Num == 0) {
					if (usa_next_posision == Second_Card_Num) {
						usa_next_posision = -1;
						Usa_Moving = 1;
					} else {
						Touched_Num = usa_next_posision;
						First_Card_Num = Touched_Num;
						Usa_Card_Num = 1;
						card_opend[First_Card_Num] = 1;
					}
				} else if (Usa_Card_Num == 1) {
					if (usa_next_posision == First_Card_Num) {
						usa_next_posision = -1;
						Usa_Moving = 1;
					} else {
						Touched_Num = usa_next_posision;
						Second_Card_Num = Touched_Num;
						Usa_Card_Num = 0;
						card_opend[First_Card_Num] = 0;
						usa_next_posision = -1;
					}
				}
			}
		});

		return scene;
	}
    
    game.game2SelectScene = function() {
        game.fps = 30;
        var scene = new Scene();
        shooting_menu(game, scene);
        return scene;
    }

    game.game2EnemyScene = function() {
        game.fps = 30;
        var scene = new Scene();
        enemy_menu(game, scene);
        return scene;
    }
    
    game.game2HowScene = function() {
        game.fps = 30;
        var scene = new Scene();
        how_menu(game, scene);
        return scene;
    }
    
    game.game2Scene = function() {
        game.fps = 30;
        var scene = new Scene();
        shooting_start(game, scene);
        return scene;
    }
	
	game.game3SelectScene = function() {
        game.fps = 30;
        var scene = new Scene();
        slidepazzle_menu(game, scene);
        return scene;
    }
    
    game.game3HowtoScene = function() {
        game.fps = 30;
        var scene = new Scene();
        slidepazzle_howto_scene(game, scene);
        return scene;
    }

    game.game3Scene = function() {
        game.fps = 30;
        var scene = new Scene();
        slidepazzle_start(game, scene);
        return scene;
    }

	//game.start();
    game.debug();
}
