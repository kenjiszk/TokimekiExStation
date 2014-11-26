var PANNEL_NUM = 25;
var PANNEL_H_NUM = 5;
var PANNEL_V_NUM = 5;
var PANNEL_CONTAINER_WIDTH = 600;
var PANNEL_CONTAINER_HEIGHT = 600;
var ONE_STEP = 10;
var MOVING_COUNT_MAX = 24 * ONE_STEP;
var PAZZLE_COMPLETE = 0;

var complete_seek_count = 0;
var Step_Count = 0;

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

function slidepazzle_menu(game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['shooting/shooting_back2.png'];
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
    
    bg.addEventListener('touchstart', function() {
        game.replaceScene(game.game3Scene());
    });
    return scene;
}


function slidepazzle_start(game, scene) {
    // stop back music
    audio_back.pause();
    audio_back.currentTime = 0;
    ///////////////////////////
    // background
    var bg1 = new Sprite(width, height);
    bg1.image = game.assets['shooting/shooting_back2.png'];
    //scene.addChild(bg1);
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
	
	ONE_STEP = 20;
	PAZZLE_COMPLETE = 0;
	
	hikari = new Hikari();
	hikari.setBottomPosition(pannels[0].x + pannels[0].width/2, pannels[0].y);
	MOVING_COUNT_MAX = 24 * ONE_STEP;
	scene.addChild(hikari);
	
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
				console.log("left", this.posX - 1, this.posY);
				if (this.posX - 1 == pannels[PANNEL_NUM - 1].posX && this.posY == pannels[PANNEL_NUM - 1].posY) {
					console.log("Blank is Left!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 右チェック
			if (this.posX % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				console.log("right", this.posX + 1, this.posY);
				if (this.posX + 1 == pannels[PANNEL_NUM - 1].posX && this.posY == pannels[PANNEL_NUM - 1].posY) {
					console.log("Blank is Right!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 上チェック
			if (this.posY % PANNEL_V_NUM != 0) {
				console.log("top", this.posX, this.posY - 1);
				if (this.posX == pannels[PANNEL_NUM - 1].posX && this.posY - 1 == pannels[PANNEL_NUM - 1].posY) {
					console.log("Blank is Up!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
			// 下チェック
			if (this.posY % PANNEL_V_NUM != PANNEL_V_NUM - 1) {
				console.log("bottom", this.posX, this.posY + 1);
				if (this.posX == pannels[PANNEL_NUM - 1].posX && this.posY + 1 == pannels[PANNEL_NUM - 1].posY) {
					console.log("Blank is Down!");
					swapPannel(this, pannels[PANNEL_NUM - 1]);
					return;
				}
			}
		});
	}
	
	scene.addEventListener("enterframe", function(e) {
	
		if (hikari.movingCount >= MOVING_COUNT_MAX) {
			Step_Count = 0;
			hikari.movingCount = 0;
//			hikari.moving = false;
			console.log("reset moving");
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
						console.log("next from bottom", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "bottom") {
						if (hikari.currentPannel < 20) {
							hikari.pannelMoveFrom = "top";
							hikari.currentPannel += PANNEL_V_NUM;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
						console.log("next from top", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "left") {
						if (hikari.currentPannel % PANNEL_V_NUM != 0) {
							hikari.pannelMoveFrom = "right";
							hikari.currentPannel -= 1;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
						console.log("next from right", hikari.currentPannel);
						break;
					} else if (hikari.pannelMoveTo == "right") {
						if (hikari.currentPannel % PANNEL_V_NUM != 4) {
							hikari.pannelMoveFrom = "left";
							hikari.currentPannel += 1;
						} else {
							hikari.pannelMoveFrom = "";
							hikari.currentPannel = 999;
						}
						console.log("next from left", hikari.currentPannel);
						break;
					}
				}
			}
		}
	
		if (hikari.movingCount % ONE_STEP == 0) {
			console.log("===============================================================================================");
			complete_seek_count = 0;
			isRoadComplete(hikari.currentPannel, pannels, hikari.pannelMoveTo);
		}
	
//		if (!hikari.moving) {
		if (hikari.movingCount % (2 * ONE_STEP) == 0) {
			console.log("not moving now, start moving", hikari.currentPannel);
			for (var i = 0; i < PANNEL_NUM; i++) {
				if (hikari.currentPannel == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
					console.log("===============", hikari.pannelMoveFrom, hikari.pannelMoveTo);
					if (hikari.pannelMoveFrom == "top") {
						console.log("moveFrom top");
						if (isArraySame(pannels[i].type, [1, 0, 0, 1])) {
							if (Step_Count < 6) {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "right";
							console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 0, 1, 0])) {
							if (Step_Count < 6) {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "left";
							console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [1, 1, 0, 0])) {
							// 下に動く
							hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "bottom";
							console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 下に動く
							hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "bottom";
							console.log("moveTo bottom");
						}
					} else if (hikari.pannelMoveFrom == "bottom") {
						console.log("moveFrom bottom");
						if (isArraySame(pannels[i].type, [0, 1, 1, 0])) {
							if (Step_Count < 6) {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "left";
							console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [0, 1, 0, 1])) {
							if (Step_Count < 6) {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "right";
							console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 1, 0, 0])) {
							// 上に動く
							hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "top";
							console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 上に動く
							hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "top";
							console.log("moveTo top");
						}
					} else if (hikari.pannelMoveFrom == "left") {
						console.log("moveFrom left");
						if (isArraySame(pannels[i].type, [1, 0, 1, 0])) {
							if (Step_Count < 6) {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "top";
							console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [0, 1, 1, 0])) {
							if (Step_Count < 6) {
								// 右に半分動く
								hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "bottom";
							console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [0, 0, 1, 1])) {
							// 右に動く
							hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "right";
							console.log("moveTo right");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 右に動く
							hikari.tl.moveBy(5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "right";
							console.log("moveTo right");
						}
					} else if (hikari.pannelMoveFrom == "right") {
						console.log("moveFrom right");
						if (isArraySame(pannels[i].type, [1, 0, 0, 1])) {
							if (Step_Count < 6) {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 上に半分動く
								hikari.tl.moveBy(0, -5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, -5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "top";
							console.log("moveTo top");
						} else if (isArraySame(pannels[i].type, [0, 1, 0, 1])) {
							if (Step_Count < 6) {
								// 左に半分動く
								hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							} else {
								// 下に半分動く
								hikari.tl.moveBy(0, 5, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(0, 5, ONE_STEP).and().scaleTo(1, ONE_STEP);
							}
							hikari.pannelMoveTo = "bottom";
							console.log("moveTo bottom");
						} else if (isArraySame(pannels[i].type, [0, 0, 1, 1])) {
							// 左に動く
							hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "left";
							console.log("moveTo left");
						} else if (isArraySame(pannels[i].type, [1, 1, 1, 1])) {
							// 左に動く
							hikari.tl.moveBy(-5, 0, ONE_STEP).and().scaleTo(1.1, ONE_STEP).moveBy(-5, 0, ONE_STEP).and().scaleTo(1, ONE_STEP);
							hikari.pannelMoveTo = "left";
							console.log("moveTo left");
						}
					}
				}
			}
			Step_Count++;
			console.log("aaaaaaaaaaaaaa ", Step_Count);
//			hikari.moving = true;
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
	
	console.log(tmpX, tmpY, tmpPosX, tmpPosY);
	blankPannel.setX(pannel.posX * pannel.width);
	blankPannel.setY(pannel.posY * pannel.height);
	blankPannel.posX = pannel.posX;
	blankPannel.posY = pannel.posY;
	
	console.log(tmpX, tmpY, tmpPosX, tmpPosY);
	pannel.tl.moveTo(tmpX, tmpY, 10);
	pannel.posX = tmpPosX;
	pannel.posY = tmpPosY;
	console.log(pannel.x, pannel.y, pannel.posX, pannel.posY);
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
//	console.log("================================== isRoadComplete", currentPannelNum);
	// 今のPannelをGET
	var currentPannel;
	for (var i = 0; i < pannels.length; i++) {
		if (currentPannelNum == (pannels[i].posX + pannels[i].posY * PANNEL_H_NUM)) {
			currentPannel = pannels[i];
			console.log("currentPannelNum", currentPannelNum);
			break;
		}
	}
	// 最終パネルの場合
//	console.log(currentPannelNum, PANNEL_NUM -1, currentPannel.type);
	if (currentPannelNum == PANNEL_NUM - 1) {
//		console.log("出口がしたむきならおわり");
//		var completeFlag = false;
		if (pannelMoveTo == "bottom") {
//			if (isArraySame(currentPannel.type, [1, 1, 0, 0]) || isArraySame(currentPannel.type, [1, 1, 1, 1])) {
//				completeFlag = true;
//			}
//		} else if (pannelMoveTo == "right") {
//			if (isArraySame(currentPannel.type, [0, 1, 1, 0])) {
//				completeFlag = true;
//			}
//		}
//		
//		if (completeFlag) {
			console.log("clear!!!")
			console.log("スピードアップ！")
			ONE_STEP = 1;
			MOVING_COUNT_MAX = 24 * ONE_STEP;
			// 今まで進んだStep_Countにhikari.movingCountを修正
			hikari.movingCount = 2 * Step_Count;
			PAZZLE_COMPLETE = 1;
			return true;
		}
	}
	
	// hikariが向かっている方向(pannelMoveTo)とパネルのタイプからその次のパネルの情報を得る
//	console.log("pannel move to ", pannelMoveTo);
	if (pannelMoveTo == "top") {
//		console.log("今topに向かっている場合", currentPannel.type);
//		if (isArraySame(currentPannel.type, [1, 0, 1, 0])) {
//			console.log("左に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != 0) {
//				isRoadComplete(currentPannelNum - 1, pannels, "left");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [1, 0, 0, 1])) {
//			console.log("右に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
//				isRoadComplete(currentPannelNum + 1, pannels, "right");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 0, 0])) {
//			console.log("上に向かっている");
			if (currentPannelNum >= PANNEL_H_NUM) {
				isRoadComplete(currentPannelNum - PANNEL_H_NUM, pannels, getNextDirection(pannelMoveTo, currentPannelNum - PANNEL_H_NUM, pannels));
				return;
			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 1, 1])) {
//			console.log("上に向かっている");
//			if (currentPannelNum >= PANNEL_H_NUM) {
//				isRoadComplete(currentPannelNum - PANNEL_H_NUM, pannels, "top");
//				return;
//			}
//		}
	} else if (pannelMoveTo == "bottom") {
//		console.log("今bottomに向かっている場合", currentPannel.type);
//		if (isArraySame(currentPannel.type, [0, 1, 1, 0])) {
//			console.log("左に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != 0) {
//				isRoadComplete(currentPannelNum - 1, pannels, "left");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [0, 1, 0, 1])) {
//			console.log("右に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
//				isRoadComplete(currentPannelNum + 1, pannels, "right");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 0, 0])) {
//			console.log("下に向かっている");
			if (currentPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
				isRoadComplete(currentPannelNum + PANNEL_H_NUM, pannels, getNextDirection(pannelMoveTo, currentPannelNum + PANNEL_H_NUM, pannels));
				return;
			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 1, 1])) {
//			console.log("下に向かっている");
//			if (currentPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
//				isRoadComplete(currentPannelNum + PANNEL_H_NUM, pannels, "bottom");
//				return;
//			}
//		}
	} else if (pannelMoveTo == "right") {
//		console.log("今rightに向かっている場合", currentPannel.type);
//		if (isArraySame(currentPannel.type, [1, 0, 0, 1])) {
//			console.log("上に向かっている");
//			if (currentPannelNum >= PANNEL_H_NUM) {
//				isRoadComplete(currentPannelNum - PANNEL_H_NUM, pannels, "top");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [0, 1, 0, 1])) {
//			console.log("下に向かっている");
//			if (currentPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
//				isRoadComplete(currentPannelNum + PANNEL_H_NUM, pannels, "bottom");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [0, 0, 1, 1])) {
//			console.log("右に向かっている");
			if (currentPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				isRoadComplete(currentPannelNum + 1, pannels, getNextDirection(pannelMoveTo, currentPannelNum + 1, pannels));
				return;
			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 1, 1])) {
//			console.log("右に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
//				isRoadComplete(currentPannelNum + 1, pannels, "right");
//				return;
//			}
//		}
	} else if (pannelMoveTo == "left") {
//		console.log("今leftに向かっている場合", currentPannel.type);
//		if (isArraySame(currentPannel.type, [1, 0, 1, 0])) {
//			console.log("上に向かっている");
//			if (currentPannelNum >= PANNEL_H_NUM) {
//				isRoadComplete(currentPannelNum - PANNEL_H_NUM, pannels, "top");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [0, 1, 1, 0])) {
//			console.log("下に向かっている");
//			if (currentPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
//				isRoadComplete(currentPannelNum + PANNEL_H_NUM, pannels, "bottom");
//				return;
//			}
//		} else if (isArraySame(currentPannel.type, [0, 0, 1, 1])) {
//			console.log("左に向かっている");
			if (currentPannelNum % PANNEL_H_NUM != 0) {
				isRoadComplete(currentPannelNum - 1, pannels, getNextDirection(pannelMoveTo, currentPannelNum - 1, pannels));
				return;
			}
//		} else if (isArraySame(currentPannel.type, [1, 1, 1, 1])) {
//			console.log("左に向かっている");
//			if (currentPannelNum % PANNEL_H_NUM != 0) {
//				isRoadComplete(currentPannelNum - 1, pannels, "left");
//				return;
//			}
//		}
	}
//	console.log("end!!!!!!!!!!");
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
//		console.log("前のパネルはtopに向かっていた");
		if (isArraySame(nextPannel.type, [0, 1, 1, 0])) {
//			console.log("左に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 0, 1])) {
//			console.log("右に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 0, 0])) {
//			console.log("上に向かっている");
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
//			console.log("上に向かっている");
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		}
	} else if (previousPannelMoveTo == "bottom") {
//		console.log("前のパネルはbottomに向かっていた");
		if (isArraySame(nextPannel.type, [1, 0, 1, 0])) {
//			console.log("左に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [1, 0, 0, 1])) {
//			console.log("右に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 0, 0])) {
//			console.log("下に向かっている");
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
//			console.log("下に向かっている");
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		}
	} else if (previousPannelMoveTo == "right") {
//		console.log("前のパネルはrightに向かっていた");
		if (isArraySame(nextPannel.type, [1, 0, 1, 0])) {
//			console.log("上に向かっている");
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 1, 0])) {
//			console.log("下に向かっている");
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1) || nextPannelNum == PANNEL_NUM - 1) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [0, 0, 1, 1])) {
//			console.log("右に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
//			console.log("右に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != PANNEL_H_NUM - 1) {
				return "right";
			}
		}
	} else if (previousPannelMoveTo == "left") {
//		console.log("前のパネルはleftに向かっていた");
		if (isArraySame(nextPannel.type, [1, 0, 0, 1])) {
//			console.log("上に向かっている");
			if (nextPannelNum >= PANNEL_H_NUM) {
				return "top";
			}
		} else if (isArraySame(nextPannel.type, [0, 1, 0, 1])) {
//			console.log("下に向かっている");
			if (nextPannelNum < PANNEL_H_NUM * (PANNEL_V_NUM - 1)) {
				return "bottom";
			}
		} else if (isArraySame(nextPannel.type, [0, 0, 1, 1])) {
//			console.log("左に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		} else if (isArraySame(nextPannel.type, [1, 1, 1, 1])) {
//			console.log("左に向かっている");
			if (nextPannelNum % PANNEL_H_NUM != 0) {
				return "left";
			}
		}
	}
//	console.log("cannot find next moveTo");
	return "";
}
