var PANNEL_NUM = 25;
var PANNEL_H_NUM = 5;
var PANNEL_V_NUM = 5;
var PANNEL_CONTAINER_WIDTH = 600;
var PANNEL_CONTAINER_HEIGHT = 600;
var ONE_STEP = 20;
var ONE_STEP_SLOW = 20;
var MOVING_COUNT_MAX = 24 * ONE_STEP;
var PAZZLE_COMPLETE = 0;
var SPEED_UP_DIFF = 2;

var complete_seek_count = 0;
var Step_Count = 0;
var Game_Over = 0;
var Clear_Displayed = 0;
var After_Clear_Count = 0;
var Stage_No_Num = 1;

Pannel = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, PANNEL_CONTAINER_WIDTH / PANNEL_H_NUM, PANNEL_CONTAINER_HEIGHT / PANNEL_V_NUM);
		this.posX;
		this.posY;
		this.type;
		this.addEventListener('touchstart', function() {
		});
	},
	setX: function(relativeX) {
		this.x = (width - PANNEL_CONTAINER_WIDTH) / 2 + relativeX;
	},
	setY: function(relativeY) {
		this.y = (height - PANNEL_CONTAINER_HEIGHT) / 2 + relativeY;
	}
});

PannelContainer = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, PANNEL_CONTAINER_WIDTH, PANNEL_CONTAINER_HEIGHT);
		this.x = 0;
		this.y = 0;
	}
});

Hikari = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 123);
		this.image = game.assets['shooting/hikari.png'];
		this.currentPannel = 0;
		this.movingCount = 0;
		this.pannelMoveFrom = "top";
		this.pannelMoveTo = "";
		this.moving = false;
	},
	setBottomPosition: function(x, y) {
		this.x = x - this.width/2;
		this.y = y - this.height;
	}
});
var hikari;

Nozomi = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 123);
		this.image = game.assets['slidepazzle/nozomi.png'];
	}
});
var nozomi;

SlidePazzleClear = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 600, 300);
        this.image = game.assets['slidepazzle/slidepazzle_clear.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

Game3Over = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 600, 300);
        this.image = game.assets['slidepazzle/slidepazzle_gameover.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

function slidepazzle_menu(game, scene) {
    // reset params
    Stage_No_Num = 1;
    ONE_STEP = 20;

    var bg = new Sprite(width, height);
    bg.image = game.assets['slidepazzle/background.png'];
    scene.addChild(bg);
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        game.replaceScene(game.menuScene());
    });
    scene.addChild(back_b);
    
    // clear_stage
    var clear_stage_string = new Sprite(430, 56);
    clear_stage_string.image = game.assets['slidepazzle/slidepazzle_clear_stage.png'];
    clear_stage_string.x = 0;
    clear_stage_string.y = 0;
    scene.addChild(clear_stage_string);
    
    var clear_stage = get_slidepazzle_high_score();
    var point_digit = new Array(2);
    for (var i = 0; i < point_digit.length; i++) {
        point_digit[i] = new Sprite(POINT_HEIGHT, POINT_HEIGHT);
        point_digit[i].image = game.assets['slidepazzle/slidepazzle_point.png'];
        point_digit[i].x = width*4/5 - POINT_HEIGHT * (i);
        point_digit[i].x += POINT_HEIGHT/4 * i;
        point_digit[i].y = 0;
        point_digit[i].frame = 0;
        scene.addChild(point_digit[i]);
    }
    update_clear_stage(clear_stage, point_digit);
    
    //title
    var title = new Sprite(640, 179);
    title.image = game.assets['slidepazzle/slidepazzle_title.png'];
    title.x = (width-title.width)/2;
    title.y = clear_stage_string.height + 30;
    scene.addChild(title);
    
    // rail
    var slidepazzle_top_rail = new Sprite(640, 120);
    slidepazzle_top_rail.image = game.assets['slidepazzle/slidepazzle_top_rail.png'];
    slidepazzle_top_rail.x = 0;
    slidepazzle_top_rail.y = title.y + title.height + (height-(title.y + title.height))/3*0.3;
    scene.addChild(slidepazzle_top_rail);
    
    // hikari & nozomi
    hikari = new Hikari();
    nozomi = new Nozomi();
    
    hikari.x = slidepazzle_top_rail.x - hikari.width;
    hikari.y = slidepazzle_top_rail.y - hikari.height/2;
    hikari.tl.moveBy(width + 3*hikari.width, 0 , 150).moveBy(-(width + 3*hikari.width), 0, 1).loop();
    scene.addChild(hikari);
    
    nozomi.x = slidepazzle_top_rail.x - hikari.width - 2*nozomi.width;
    nozomi.y = slidepazzle_top_rail.y - nozomi.height/2;
    nozomi.tl.moveBy(width + 3*nozomi.width, 0 , 150).moveBy(-(width + 3*nozomi.width), 0, 1).loop();
    scene.addChild(nozomi);
    
    // howto
    var slidepazzle_howto = new Sprite(400, 150);
    slidepazzle_howto.image = game.assets['slidepazzle/slidepazzle_howto.png'];
    slidepazzle_howto.x = (width-slidepazzle_howto.width)/2;
    slidepazzle_howto.y = title.y + title.height + (height-(title.y + title.height))/3*1.2;
    slidepazzle_howto.addEventListener(Event.TOUCH_START, function(e) {
        game.replaceScene(game.game3HowtoScene());
    });
    scene.addChild(slidepazzle_howto);
    
    // start
    var slidepazzle_start = new Sprite(400, 150);
    slidepazzle_start.image = game.assets['slidepazzle/slidepazzle_start.png'];
    slidepazzle_start.x = (width-slidepazzle_start.width)/2;
    slidepazzle_start.y = title.y + title.height + (height-(title.y + title.height))/3*2;
    slidepazzle_start.addEventListener(Event.TOUCH_START, function(e) {
        game.replaceScene(game.game3Scene());
    });
    scene.addChild(slidepazzle_start);
    
    return scene;
}

function slidepazzle_howto_scene(game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['slidepazzle/slidepazzle_howto_back.png'];
    scene.addChild(bg);
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        game.replaceScene(game.game3SelectScene());
    });
    scene.addChild(back_b);
    
    var moving_pazzle = new Sprite(120, 120);
    moving_pazzle.image = game.assets['slidepazzle/vertical.png'];
    // 1と32はマジックナンバー
    moving_pazzle.x = 20 + moving_pazzle.width + 1;
    moving_pazzle.y = (height - 600)/2 + moving_pazzle.height * 2 + 33;
    moving_pazzle.tl.delay(20).moveBy(moving_pazzle.width, 0, 20).delay(19).moveBy(-moving_pazzle.width, 0, 1).loop();
    scene.addChild(moving_pazzle);
    
    var slidepazzle_howto_hand = new Sprite(90, 120);
    slidepazzle_howto_hand.image = game.assets['slidepazzle/slidepazzle_menu_hand.png'];
    slidepazzle_howto_hand.x = width*2/8;
    slidepazzle_howto_hand.y = height*11/20;
    slidepazzle_howto_hand.tl.moveBy(0, -20, 20).moveBy(0, 20, 20).delay(20).loop();
    scene.addChild(slidepazzle_howto_hand);
    
    return scene;
}

function slidepazzle_start(game, scene) {
    console.log("ONE_STEP", ONE_STEP);
    // stop back music
    audio_back.pause();
    audio_back.currentTime = 0;
    ///////////////////////////
    // background
    var bg1 = new Sprite(width, height);
    bg1.image = game.assets['slidepazzle/background.png'];
    scene.addChild(bg1);
    /////////////////////////////
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        game.replaceScene(game.game3SelectScene());
    });
    scene.addChild(back_b);
    
    // clear_stage
    var clear_stage_string = new Sprite(430, 56);
    clear_stage_string.image = game.assets['slidepazzle/slidepazzle_highscore.png'];
    clear_stage_string.x = 0;
    clear_stage_string.y = 0;
    scene.addChild(clear_stage_string);
    
    var clear_stage = get_slidepazzle_high_score();
    var point_digit = new Array(2);
    for (var i = 0; i < point_digit.length; i++) {
        point_digit[i] = new Sprite(POINT_HEIGHT, POINT_HEIGHT);
        point_digit[i].image = game.assets['slidepazzle/slidepazzle_point.png'];
        point_digit[i].x = width*4/6 - POINT_HEIGHT * (i);
        point_digit[i].x += POINT_HEIGHT/4 * i;
        point_digit[i].y = 0;
        point_digit[i].frame = 0;
        scene.addChild(point_digit[i]);
    }
    update_clear_stage(clear_stage, point_digit);
    
    // stage no
    var stage_no = new Sprite(300, 56);
    stage_no.image = game.assets['slidepazzle/slidepazzle_stage_no.png'];
    stage_no.x = width*1/3;
    stage_no.y = clear_stage_string.y + clear_stage_string.height + 30;
    scene.addChild(stage_no);
    
    var stage_no_digit = new Array(2);
    for (var i = 0; i < stage_no_digit.length; i++) {
        stage_no_digit[i] = new Sprite(POINT_HEIGHT, POINT_HEIGHT);
        stage_no_digit[i].image = game.assets['slidepazzle/slidepazzle_point_white.png'];
        stage_no_digit[i].x = width*5/6 - POINT_HEIGHT * (i);
        stage_no_digit[i].x += POINT_HEIGHT/4 * i;
        stage_no_digit[i].y = stage_no.y;
        stage_no_digit[i].frame = 0;
        scene.addChild(stage_no_digit[i]);
    }
    update_clear_stage(Stage_No_Num, stage_no_digit);
    
	var container = new PannelContainer();
	container.backgroundColor = "black";
	container.x = (width - container.width) / 2;
	container.y = (height - container.height) / 2;
	scene.addChild(container);
	
	// init pannels
	var pannels = new Array(PANNEL_NUM);
	for (var i = PANNEL_NUM - 1; i > -1; i--) {
		
		pannels[i] = new Pannel();
		pannels[i].posX = i % PANNEL_H_NUM;
		pannels[i].posY = Math.floor(i / PANNEL_H_NUM);
		pannels[i].setX((i % PANNEL_H_NUM) * pannels[i].width);
		pannels[i].setY(Math.floor(i / PANNEL_H_NUM) * pannels[i].height);
		scene.addChild(pannels[i]);
		
		if (i < 4) {
			pannels[i].image = game.assets['slidepazzle/bottom_to_left.png'];
			pannels[i].type = [0, 1, 1, 0];
		} else if (i < 8) {
			pannels[i].image = game.assets['slidepazzle/bottom_to_right.png'];
			pannels[i].type = [0, 1, 0, 1];
		} else if (i < 10) {
			pannels[i].image = game.assets['slidepazzle/cross.png'];
			pannels[i].type = [1, 1, 1, 1];
		} else if (i < 13) {
			pannels[i].image = game.assets['slidepazzle/horizontal.png'];
			pannels[i].type = [0, 0, 1, 1];
		} else if (i < 16) {
			pannels[i].image = game.assets['slidepazzle/vertical.png'];
			pannels[i].type = [1, 1, 0, 0];
		} else if (i < 20) {
			pannels[i].image = game.assets['slidepazzle/top_to_left.png'];
			pannels[i].type = [1, 0, 1, 0];
		} else if (i < 24) {
			pannels[i].image = game.assets['slidepazzle/top_to_right.png'];
			pannels[i].type = [1, 0, 0, 1];
		} else {
			pannels[i].image = game.assets['slidepazzle/blank.png'];
			pannels[i].type = [0, 0, 0, 0];
		}
	}
	
	Game_Over = 0;
	PAZZLE_COMPLETE = 0;
	Clear_Displayed = 0;
	After_Clear_Count = 0;
	
	hikari = new Hikari();
	hikari.setBottomPosition(pannels[0].x + pannels[0].width/2, pannels[0].y);
	MOVING_COUNT_MAX = 24 * ONE_STEP;
	scene.addChild(hikari);
	
	nozomi = new Nozomi();
	nozomi.x = pannels[PANNEL_NUM - 1].x + (pannels[PANNEL_NUM - 1].width - nozomi.width)/2;
	nozomi.y = pannels[PANNEL_NUM - 1].y + pannels[PANNEL_NUM - 1].height;
	scene.addChild(nozomi);
	
	var clear = new SlidePazzleClear();
	var game_over = new Game3Over();
	
	// shuffle pannel
	var pannelSortArray = new Array(PANNEL_NUM);
	for (var i = 0; i < PANNEL_NUM; i++) {
		pannelSortArray[i] = i;
	}
	var isFirstPannelCannotStart = true;
	while(isFirstPannelCannotStart) {
		shuffle(pannelSortArray);
		var edgeCount = 0;
		for (var i = 0; i < PANNEL_NUM; i++) {
			pannels[i].posX = pannelSortArray[i] % PANNEL_H_NUM;
			pannels[i].posY = Math.floor(pannelSortArray[i] / PANNEL_H_NUM);
			pannels[i].setX((pannelSortArray[i] % PANNEL_H_NUM) * pannels[i].width);
			pannels[i].setY(Math.floor(pannelSortArray[i] / PANNEL_H_NUM) * pannels[i].height);
		}

		for (var i = 0; i < PANNEL_NUM; i++) {
			if (pannels[i].posX == 0 && pannels[i].posY == 0) {
				if (pannels[i].type[0] == 1 && (pannels[i].type[1] == 1 || pannels[i].type[3] == 1)) {
					edgeCount++;
				}
			}
			if (pannels[i].posX == PANNEL_H_NUM - 1 && pannels[i].posY == PANNEL_V_NUM - 1) {
				if (pannels[i].type[1] == 1 && (pannels[i].type[0] == 1 || pannels[i].type[2] == 1)) {
					edgeCount++;
				}
			}
		}
		if (edgeCount == 2) {
			isFirstPannelCannotStart = false;
		}
	}
	
	for (var i = 0; i < PANNEL_NUM; i++) {
		pannels[i].addEventListener('touchend', function(e) {
			// hikariが上にいるかチェック
			if (hikari.currentPannel == (this.posX + this.posY * PANNEL_H_NUM)) {
				return;
			}
			// 左チェック
			if (this.posX % PANNEL_H_NUM != 0) {
				//console.log("left", this.posX - 1, this.posY);
				if (this.posX - 1 == pannels[PANNEL_NUM - 1].posX && this.posY == pannels[PANNEL_NUM - 1].posY) {
					//console.log("Blank is Left!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 右チェック
			if (this.posX % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				//console.log("right", this.posX + 1, this.posY);
				if (this.posX + 1 == pannels[PANNEL_NUM - 1].posX && this.posY == pannels[PANNEL_NUM - 1].posY) {
					//console.log("Blank is Right!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 上チェック
			if (this.posY % PANNEL_V_NUM != 0) {
				//console.log("top", this.posX, this.posY - 1);
				if (this.posX == pannels[PANNEL_NUM - 1].posX && this.posY - 1 == pannels[PANNEL_NUM - 1].posY) {
					//console.log("Blank is Up!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 下チェック
			if (this.posY % PANNEL_V_NUM != PANNEL_V_NUM - 1) {
				//console.log("bottom", this.posX, this.posY + 1);
				if (this.posX == pannels[PANNEL_NUM - 1].posX && this.posY + 1 == pannels[PANNEL_NUM - 1].posY) {
					//console.log("Blank is Down!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
		});
	}
	
	scene.addEventListener("touchstart", function(e) {
		if (After_Clear_Count >= 50) {
			if (Game_Over == 1) {
				game.replaceScene(game.game3SelectScene());
			} else if (Game_Over == 2) {
                if (Stage_No_Num > get_slidepazzle_high_score()) {
                    set_slidepazzle_high_score(Stage_No_Num);
                }
            
                Stage_No_Num++;
                ONE_STEP = 20 - Stage_No_Num * SPEED_UP_DIFF;
				game.replaceScene(game.game3Scene());
			}
		}
	});
	
	scene.addEventListener("enterframe", function(e) {
		if (Game_Over == 1) {
			
			if (After_Clear_Count < 50) {
				After_Clear_Count++;
				//console.log(After_Clear_Count);
			}
			
			if (Clear_Displayed == 0) {
				nozomi.tl.clear();
				game_over.tl.hide().moveTo((width-clear.width)/2, (height-clear.height)/2, 1).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).loop();
				scene.addChild(game_over);
				Clear_Displayed = 1;
			}
		} else if (Game_Over == 2) {
		
			if (After_Clear_Count < 50) {
				After_Clear_Count++;
				//console.log(After_Clear_Count);
			}
		
			if (Clear_Displayed == 0) {
				nozomi.tl.clear();
				hikari.tl.moveTo(width/4 - hikari.width/2, height/2 - hikari.height/2, 10).and().scaleTo(3, 10);
				nozomi.tl.moveTo(width*3/4 - nozomi.width/2, height/2 - nozomi.height/2, 10).and().scaleTo(3, 10);
				clear.tl.hide().moveTo((width-clear.width)/2, (height-clear.height)/2, 1).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).fadeIn(20).fadeOut(20).loop();
				scene.addChild(clear);
				Clear_Displayed = 1;
			}
		}
	
		if (hikari.movingCount >= MOVING_COUNT_MAX) {
			Step_Count = 0;
			hikari.movingCount = 0;
			for (var i = 0; i < PANNEL_NUM; i++) {
				if (hikari.currentPannel == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
					if (hikari.pannelMoveTo == "top") {
						if (hikari.currentPannel > 5) {
							hikari.pannelMoveFrom = "bottom";
							hikari.currentPannel -= PANNEL_V_NUM;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
//						console.log("next from bottom", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "bottom") {
						if (hikari.currentPannel == PANNEL_NUM - 1) {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 555;
						} else if (hikari.currentPannel < 20) {
							hikari.pannelMoveFrom = "top";
							hikari.currentPannel += PANNEL_V_NUM;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
//						console.log("next from top", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "left") {
						if (hikari.currentPannel % PANNEL_V_NUM != 0) {
							hikari.pannelMoveFrom = "right";
							hikari.currentPannel -= 1;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
//						console.log("next from right", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "right") {
						if (hikari.currentPannel % PANNEL_V_NUM != 4) {
							hikari.pannelMoveFrom = "left";
							hikari.currentPannel += 1;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
//						console.log("next from left", hikari.currentPannel);
						break;
					}
				}
			}
		}
		
		if (hikari.currentPannel == "999") {
			Game_Over = 1;
			return;
		}
		if (hikari.currentPannel == "555") {
			Game_Over = 2;
			return;
		}
	
		if (hikari.movingCount % ONE_STEP == 0) {
			//console.log("===============================================================================================");
			complete_seek_count = 0;
			isRoadComplete(hikari.currentPannel, pannels, hikari.pannelMoveTo);
		}
	
		if (hikari.movingCount % (2 * ONE_STEP) == 0) {
			//console.log("not moving now, start moving", hikari.currentPannel);
			for (var i = 0; i < PANNEL_NUM; i++) {
				if (hikari.currentPannel == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
					//console.log("===============", hikari.pannelMoveFrom, hikari.pannelMoveTo);
					if (hikari.pannelMoveFrom == "top") {
						//console.log("moveFrom top");
						if (isArraySame(pannels[i].type, [1, 0, 0, 1])) {
							if (Step_Count < 6) {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "right";
							//console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 0, 1, 0])) {
							if (Step_Count < 6) {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "left";
							//console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [1, 1, 0, 0])) {
							// 下に動く
							hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "bottom";
							//console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 下に動く
							hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "bottom";
							//console.log("moveTo bottom");
						} else {
							Game_Over = 1;
							return;
						}
					} else if (hikari.pannelMoveFrom == "bottom") {
						//console.log("moveFrom bottom");
						if (isArraySame(pannels[i].type, [0, 1, 1, 0])) {
							if (Step_Count < 6) {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "left";
							//console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [0, 1, 0, 1])) {
							if (Step_Count < 6) {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "right";
							//console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 1, 0, 0])) {
							// 上に動く
							hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "top";
							//console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 上に動く
							hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "top";
							//console.log("moveTo top");
						} else {
							Game_Over = 1;
							return;
						}
					} else if (hikari.pannelMoveFrom == "left") {
						//console.log("moveFrom left");
						if (isArraySame(pannels[i].type, [1, 0, 1, 0])) {
							if (Step_Count < 6) {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "top";
							//console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [0, 1, 1, 0])) {
							if (Step_Count < 6) {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "bottom";
							//console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [0, 0, 1, 1])) {
							// 右に動く
							hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "right";
							//console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 右に動く
							hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "right";
							//console.log("moveTo right");
						} else {
							Game_Over = 1;
							return;
						}
					} else if (hikari.pannelMoveFrom == "right") {
						//console.log("moveFrom right");
						if (isArraySame(pannels[i].type, [1, 0, 0, 1])) {
							if (Step_Count < 6) {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "top";
							//console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [0, 1, 0, 1])) {
							if (Step_Count < 6) {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "bottom";
							//console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [0, 0, 1, 1])) {
							// 左に動く
							hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "left";
							//console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 左に動く
							hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "left";
							//console.log("moveTo left");
						} else {
							Game_Over = 1;
							return;
						}
					}
				}
			}
			Step_Count++;
			nozomi.tl.scaleTo(1.1, ONE_STEP_SLOW).scaleTo(1, ONE_STEP_SLOW);
		}
		hikari.movingCount++;
	});
    return scene;
}

function swapPannel(pannel, blankPannel) {
	var tmpX = blankPannel.x;
	var tmpY = blankPannel.y;
	var tmpPosX = blankPannel.posX;
	var tmpPosY = blankPannel.posY;
	
	//console.log(tmpX, tmpY, tmpPosX, tmpPosY);
	blankPannel.setX(pannel.posX * pannel.width);
	blankPannel.setY(pannel.posY * pannel.height);
	blankPannel.posX = pannel.posX;
	blankPannel.posY = pannel.posY;
	
	//console.log(tmpX, tmpY, tmpPosX, tmpPosY);
	pannel.tl.moveTo(tmpX, tmpY, 10);
	pannel.posX = tmpPosX;
	pannel.posY = tmpPosY;
	//console.log(pannel.x, pannel.y, pannel.posX, pannel.posY);
}

function shuffle(array) {
	var m = array.length, t, i;
	while (m) {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}
}

function isArraySame(array1, array2) {
	if (array1.length != array2.length) {
		return false;
	}
	for (var i = 0; i < array1.length; i++) {
		if (array1[i] != array2[i]) {
			return false;
		}
	}
	return true;
}

function isRoadComplete(currentPannelNum, pannels, pannelMoveTo) {
	complete_seek_count++;
	if (complete_seek_count > PANNEL_NUM) {
		return;
	}
	
	if (PAZZLE_COMPLETE == 1) {
		return;
	}
	// 今のPannelをGET
	var currentPannel;
	for (var i = 0; i < pannels.length; i++) {
		if (currentPannelNum == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
			currentPannel = pannels[i];
			//console.log("currentPannelNum", currentPannelNum);
			break;
		}
	}
	// 最終パネルの場合
	if (currentPannelNum == PANNEL_NUM - 1) {
		if (pannelMoveTo == "bottom") {
			//console.log("clear!!!")
			//console.log("スピードアップ！")
			ONE_STEP = 1;
			MOVING_COUNT_MAX = 24 * ONE_STEP;
			// 今まで進んだStep_Countにhikari.movingCountを修正
			hikari.movingCount = 2 * Step_Count;
			PAZZLE_COMPLETE = 1;
			return true;
		}
	}
	
	// hikariが向かっている方向(pannelMoveTo)とパネルのタイプからその次のパネルの情報を得る
	if (pannelMoveTo == "top") {
		if (currentPannelNum >= PANNEL_H_NUM) {
			isRoadComplete(currentPannelNum - PANNEL_H_NUM, pannels, getNextDirection(pannelMoveTo, currentPannelNum - PANNEL_H_NUM, pannels));
			return;
		}
	} else if (pannelMoveTo == "bottom") {
		if (currentPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
			isRoadComplete(currentPannelNum + PANNEL_H_NUM, pannels, getNextDirection(pannelMoveTo, currentPannelNum + PANNEL_H_NUM, pannels));
			return;
		}
	} else if (pannelMoveTo == "right") {
		if (currentPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
			isRoadComplete(currentPannelNum + 1, pannels, getNextDirection(pannelMoveTo, currentPannelNum + 1, pannels));
			return;
		}
	} else if (pannelMoveTo == "left") {
		if (currentPannelNum % PANNEL_H_NUM != 0) {
			isRoadComplete(currentPannelNum - 1, pannels, getNextDirection(pannelMoveTo, currentPannelNum - 1, pannels));
			return;
		}
	}
	return false;
}

// 前のパネルのmoveTo(=今のパネルのmoveFrom)と今のパネルのtypeから次のmoveToを出す
function getNextDirection(previousPannelMoveTo, nextPannelNum, pannels) {
	var nextPannel;
	for (var i = 0; i < pannels.length; i++) {
		if (nextPannelNum == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
			nextPannel = pannels[i];
			break;
		}
	}
	if (previousPannelMoveTo == "top") {
		if (isArraySame(nextPannel.type, [0, 1, 1, 0])) {
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 0, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 0, 0])) {
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		}
	} else if (previousPannelMoveTo == "bottom") {
		if (isArraySame(nextPannel.type, [1, 0, 1, 0])) {
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [1, 0, 0, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 0, 0])) {
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		}
	} else if (previousPannelMoveTo == "right") {
		if (isArraySame(nextPannel.type, [1, 0, 1, 0])) {
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 1, 0])) {
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [0, 0, 1, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		}
	} else if (previousPannelMoveTo == "left") {
		if (isArraySame(nextPannel.type, [1, 0, 0, 1])) {
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 0, 1])) {
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [0, 0, 1, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		}
	}
	return "";
}

function update_clear_stage(clear_stage, display_point) {
    var num2_s = Math.floor(clear_stage /   10);
    var num2_a = clear_stage % 10;
    var num1_s = Math.floor(num2_a);
    display_point[1].frame = num2_s;
    display_point[0].frame = num1_s;
}

function get_slidepazzle_high_score() {
    var score =  localStorage.getItem('slidepazzle_high_score');
    if(!score) {
        localStorage.setItem('slidepazzle_high_score', 0);
    }
    score =  localStorage.getItem('slidepazzle_high_score');
    return score;
}

function set_slidepazzle_high_score(score) {
    localStorage.setItem('slidepazzle_high_score', score);
}
