////////////////////////////////
// constants
////////////////////////////////

//var Is_Touch = 0;
var HIKARI_FIRE_NUM = 10;
var HIKARI_BIG_FIRE_NUM = 3;
var SAKIWO_FIRE_NUM = 10;
var SHINGO_FIRE_NUM = 10;
var AIRI_FIRE_NUM = 10;
var USA_NUM = 3;
var USA_HP = 3;
var USA2_NUM = 1;
var USA2_HP = 3;
var USA3_NUM = 1;
var USA3_HP = 3;
var USA_INTERVARL = 300;
var NOW = "PLAYING";
var STAGE = 1;
var POINT = 0;
var HIGH_SCORE_FLAG = 0;

////////////////////////////////
// classes
////////////////////////////////

Hikari = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 123);
		this.image = game.assets['shooting/hikari.png'];
//		this.addEventListener('touchstart', function() {
//            Is_Touch = 1;
//		});
//        this.addEventListener('touchend', function() {
//            Is_Touch = 0;
//		});
	}
});

Hikari_Head = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 60);
		this.image = game.assets['shooting/hikari_head.png'];
	}
});

Hikari_Head_Light = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 100, 60);
		this.image = game.assets['shooting/hikari_head_light.png'];
	}
});

Hikari_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_me.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

Usa = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 150, 200);
		this.image = game.assets['shooting/enemy_usa1.png'];
        this.x = -this.width;
        this.y = -this.height;
        this.hp = USA_HP;
	}
});

Sakiwo = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
		this.image = game.assets['shooting/sakiwo.png'];
        this.x = -this.width;
        this.y = -this.height;
        this.hp = 50;
	}
});

Sakiwo_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 20, 20);
		this.image = game.assets['shooting/fire_enemy.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

Shunsuke = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
		this.image = game.assets['shooting/shunsuke.png'];
        this.x = -this.width;
        this.y = -this.height;
        this.hp = 50;
	}
});

Shingo = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
		this.image = game.assets['shooting/shingo.png'];
        this.x = -this.width;
        this.y = -this.height;
        this.hp = 50;
	}
});

Shingo_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 50, 50);
		this.image = game.assets['shooting/shingo_mini.png'];
        this.x = -this.width;
        this.y = -this.height;
	}
});

Airi = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 200);
		this.image = game.assets['shooting/airi.png'];
        this.x = -this.width;
        this.y = -this.height;
        this.hp = 50;
	}
});

Airi_Fire = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 200, 100);
		this.image = game.assets['shooting/airi_hat.png'];
        this.x = -this.width;
        this.y = -this.height;
	}
});

Start = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 450, 70);
        this.image = game.assets['shooting/shooting_start.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

Clear = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 450, 70);
        this.image = game.assets['shooting/shooting_clear.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

Shooting_GameOver = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, 450, 70);
        this.image = game.assets['shooting/shooting_game_over.png'];
        this.x = -this.width;
        this.y = -this.height;
    }
});

////////////////////////////////
// sub functions
////////////////////////////////

function select_fire_num(fire) {
    for (var i = 0; i < fire.length; i++) {
        if (fire[i].y <= -fire[i].height+1 || fire[i].y >= height-1) {
            return i;
        }
    }
    return -1;
}

function is_collisioned (obj1, obj2) {
    var obj1_x = obj1.x + obj1.width/2;
    var obj1_y = obj1.y + obj1.height/2;
    var obj2_x = obj2.x + obj2.width/2;
    var obj2_y = obj2.y + obj2.height/2;
    if (Math.abs(obj1_x - obj2_x) > (obj1.width + obj2.widht)/2) {
        return 0;
    } else if (Math.abs(obj1_y - obj2_y) > (obj1.height + obj2.height)/2) {
        return 0;
    } else if (Math.sqrt(Math.pow((obj1_x - obj2_x), 2) + Math.pow((obj1_y - obj2_y), 2)) < (obj1.width + obj2.width)/2 * 0.8) {
        return 1;
    } else {
        return 0;
    }
}

function set_usa_motion(usa, s) {
    usa.tl.moveTo(Math.floor(width/4 + width/2*Math.random() - usa.width), -usa.height, 1)
        .delay(Math.floor(USA_INTERVARL*Math.random()))
        .moveBy(s*width/4, width/8, 30, SIN_EASEINOUT)
        .moveBy(-s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(-s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(-s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(s*width/2, width/4, 60, SIN_EASEINOUT)
        .moveBy(-s*width/2, width/4, 60, SIN_EASEINOUT)
        .loop();
}

function update_point(point, display_point) {
    var num5_s = Math.floor(point / 10000);
    var num5_a = point % 10000;
    var num4_s = Math.floor(num5_a / 1000);
    var num4_a = num5_a % 1000;
    var num3_s = Math.floor(num4_a /  100);
    var num3_a = num4_a %  100;
    var num2_s = Math.floor(num3_a /   10);
    var num2_a = num3_a %   10;
    var num1_s = Math.floor(num2_a);
    display_point[4].frame = num5_s;
    display_point[3].frame = num4_s;
    display_point[2].frame = num3_s;
    display_point[1].frame = num2_s;
    display_point[0].frame = num1_s;
}

function get_high_score() {
    var score =  localStorage.getItem('high_score');
    if(!score) {
        localStorage.setItem('high_score', 0);
    }
    score =  localStorage.getItem('high_score');
    return score;
}

function set_high_score(score) {
    localStorage.setItem('high_score', score);
}

function set_appeared(enemy) {
    localStorage.setItem(enemy, 1);
}

function is_appeared(enemy) {
    var appeard = localStorage.getItem(enemy);
    if(appeard) {
        return 1;
    } else {
        return 0;
    }
}

////////////////////////////////
// main functions
////////////////////////////////

function shooting_menu(game, scene) {
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
    // high score
    var score_string = new Sprite(280, 56);
    score_string.image = game.assets['shooting/high_score.png'];
    score_string.x = 0;
    score_string.y = 0;
    scene.addChild(score_string);
    var high_score = get_high_score();
    var point_digit = new Array(5);
    for (var i = 0; i < point_digit.length; i++) {
        point_digit[i] = new Sprite(POINT_HEIGHT, POINT_HEIGHT);
        point_digit[i].image = game.assets['shooting/shooting_point.png'];
        point_digit[i].x = width*4/5 - POINT_HEIGHT * (i + 1);
        point_digit[i].x += POINT_HEIGHT/4 * i;
        point_digit[i].y = 0;
        point_digit[i].frame = 0;
        scene.addChild(point_digit[i]);
    }
    update_point(high_score, point_digit);
    //title
    var title = new Sprite(640, 179);
    title.image = game.assets['shooting/shooting_title.png'];
    title.x = (width-title.width)/2;
    title.y = score_string.height;
    scene.addChild(title);
    // next page
    var next = 0;
    var next_count = 0;
    // start
    var start_b = new Sprite(410, 180);
    start_b.image = game.assets['shooting/start_b.png'];
    start_b.x = (width-start_b.width)/2;
    start_b.y = title.y + title.height;
    start_b.addEventListener(Event.TOUCH_START, function(e) {
        if (next == 0) {
            start_b.tl.moveBy(-width, 0, 40, BACK_EASEIN);
            next = 1;
        }
    });
    scene.addChild(start_b);
    // enemy
    var enemy_b = new Sprite(410, 180);
    enemy_b.image = game.assets['shooting/enemy_b.png'];
    enemy_b.x = (width-enemy_b.width)/2;
    enemy_b.y = title.y + title.height + (height-(title.y + title.height))/3.5;
    enemy_b.addEventListener(Event.TOUCH_START, function(e) {
        if (next == 0) {
            enemy_b.tl.moveBy(-width, 0, 40, BACK_EASEIN);
            next = 2;
        }
    });
    scene.addChild(enemy_b);
    // how to
    var how_b = new Sprite(410, 180);
    how_b.image = game.assets['shooting/how_b.png'];
    how_b.x = (width-how_b.width)/2;
    how_b.y = title.y + title.height + (height-(title.y + title.height))/3.5*2;
    how_b.addEventListener(Event.TOUCH_START, function(e) {
        if (next == 0) {
            how_b.tl.moveBy(-width, 0, 40, BACK_EASEIN);
            next = 3;
        }
    });
    scene.addChild(how_b);
    // hikari
    var hikari = new Hikari();
    hikari.x = (width - hikari.width)/2;
    hikari.y = height - hikari.height;
    scene.addChild(hikari);
    // hikari fire
    var hikari_fire = new Array(HIKARI_FIRE_NUM);
    for(var i = 0; i < hikari_fire.length; i++) {
        hikari_fire[i] = new Hikari_Fire();
    }
    // for DEBUG
//    scene.addEventListener("touchmove", function(e) {
//        if (Is_Touch != 0) {
//            hikari.x = e.localX - hikari.width/2;
//        }
//    });
    // device motion
    var angle  = 0;
    var past_angle = new Array(10);
    for (var i = 0; i < past_angle.length; i++) {
        past_angle[i] = 0;
    }
    window.addEventListener("devicemotion", function(e){
        for (var i = past_angle.length-1; i > 0; i--) {
            past_angle[i] = past_angle[i-1];
        }
        past_angle[0] = (Math.floor(100*e.accelerationIncludingGravity.x)/100+angle)/2;
        if (width/2/3*past_angle[0] > 290) {
            past_angle[0] = 290*2*3/width;
        } else if (width/2/3*past_angle[0] < -290) {
            past_angle[0] = -290*2*3/width;
        }
        angle = 0;
        for (var i = 0; i < past_angle.length; i++) {
            angle += past_angle[i]/past_angle.length;
        }
        hikari.x = width/2 - hikari.width/2 + width/2/3*angle;
    }, false);
    
    var count = 0;
    scene.addEventListener("enterframe", function(e) {
        if(audio_back.ended || audio_back.paused){
            audio_back.play();
        }
        if(count % 10 == 0) {
            var num = select_fire_num(hikari_fire);
            if(num != -1) {
                scene.removeChild(hikari_fire[num]);
                hikari_fire[num].x = hikari.x + hikari.width/2 - hikari_fire[num].width/2;
                hikari_fire[num].y = hikari.y;
                hikari_fire[num].tl.moveY(-hikari_fire[num].height, 50);
                scene.addChild(hikari_fire[num]);
            }
        }
        if (next != 0 && next_count == 0) {
            next_count = count;
        }
        if (count > next_count + 50 && next_count != 0) {
            if(next == 1) {
                game.replaceScene(game.game2Scene());
            } else if (next == 2) {
                game.replaceScene(game.game2EnemyScene());
            } else if (next == 3) {
                game.replaceScene(game.game2HowScene());
            }
        }
        count++;
    });
    return scene;
}

function enemy_menu(game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['shooting/shooting_back2.png'];
    scene.addChild(bg);
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        game.replaceScene(game.game2SelectScene());
    });
    scene.addChild(back_b);
    
    // enemy pannels
    var enemy_pannel = new Array(6);
    var big_pannel = new Sprite(500, 750);
    big_pannel.x = (width - big_pannel.width)/2;
    big_pannel.y = (height - big_pannel.height)/2;
    for(var i = 0; i < enemy_pannel.length; i++) {
        enemy_pannel[i] = new Sprite(250, 250);
        enemy_pannel[i].image = game.assets['shooting/q_pannel.png'];
        if (i == 0) {
            enemy_pannel[i].x = (width - enemy_pannel[i].width*2)/3;
            enemy_pannel[i].y = (height - enemy_pannel[i].height*3)/4;
            if(is_appeared('hikari')) {
                enemy_pannel[i].image = game.assets['shooting/hikari_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/hikari_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        } else if (i == 1) {
            enemy_pannel[i].x = enemy_pannel[i].width + (width - enemy_pannel[i].width*2)/3*2;
            enemy_pannel[i].y = (height - enemy_pannel[i].height*3)/4;
            if(is_appeared('usa')) {
                enemy_pannel[i].image = game.assets['shooting/usa_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/usa_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        } else if (i == 2) {
            enemy_pannel[i].x = (width - enemy_pannel[i].width*2)/3;
            enemy_pannel[i].y = enemy_pannel[i].height + 2*(height - enemy_pannel[i].height*3)/4;
            if(is_appeared('sakiwo')) {
                enemy_pannel[i].image = game.assets['shooting/sakiwo_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/sakiwo_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        } else if (i == 3) {
            enemy_pannel[i].x = enemy_pannel[i].width + (width - enemy_pannel[i].width*2)/3*2;
            enemy_pannel[i].y = enemy_pannel[i].height + 2*(height - enemy_pannel[i].height*3)/4;
            if(is_appeared('shunsuke')) {
                enemy_pannel[i].image = game.assets['shooting/shunsuke_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/shunsuke_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        } else if (i == 4) {
            enemy_pannel[i].x = (width - enemy_pannel[i].width*2)/3;
            enemy_pannel[i].y = 2*enemy_pannel[i].height + 3*(height - enemy_pannel[i].height*3)/4;
            if(is_appeared('shingo')) {
                enemy_pannel[i].image = game.assets['shooting/shingo_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/shingo_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        } else if (i == 5) {
            enemy_pannel[i].x = enemy_pannel[i].width + (width - enemy_pannel[i].width*2)/3*2;
            enemy_pannel[i].y = 2*enemy_pannel[i].height + 3*(height - enemy_pannel[i].height*3)/4;
            if(is_appeared('airi')) {
                enemy_pannel[i].image = game.assets['shooting/airi_pannel.png'];
                enemy_pannel[i].addEventListener('touchstart', function() {
                    big_pannel.image = game.assets['shooting/airi_big_pannel.png'];
                    big_pannel.addEventListener('touchstart', function() {
                        scene.removeChild(this);
                    });
                    scene.addChild(big_pannel);
                });
            }
        }
        scene.addChild(enemy_pannel[i]);
    }
    
    scene.addEventListener("enterframe", function(e) {
        if(audio_back.ended || audio_back.paused){
            audio_back.play();
        }
    });
    
    return scene;
}

function how_menu(game, scene) {
    var bg = new Sprite(width, height);
    bg.image = game.assets['shooting/shooting_back2.png'];
    scene.addChild(bg);
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        HIKARI_BIG_FIRE_NUM = 3;
        game.replaceScene(game.game2SelectScene());
    });
    scene.addChild(back_b);
    
    ///////////////////////////
    // hikari
    var hikari = new Hikari();
    hikari.x = (width - hikari.width)/2;
    hikari.y = height - hikari.height;
    scene.addChild(hikari);
    //hikari_head
    var hikari_head = new Hikari_Head();
    hikari_head.x = hikari.x;
    hikari_head.y = hikari.y;
    scene.addChild(hikari_head);
    //hikari_head_light
    var hikari_head_light = new Hikari_Head_Light();
    hikari_head_light.x = -hikari_head_light.width;
    hikari_head_light.y = -hikari_head_light.height;
    scene.addChild(hikari_head_light);
    // hikari head count
    var hikari_head_count = 0;
    // for DEBUG
//    scene.addEventListener("touchmove", function(e) {
//        if (Is_Touch != 0) {
//            hikari.x = e.localX - hikari.width/2;
//            if (hikari_head_count == 0 || game.frame < hikari_head_count + 40) {
//                hikari_head.x = hikari.x;
//                hikari_head_light.x = hikari.x;
//            }
//        }
//    });
    // hikari fire
    var hikari_fire = new Array(HIKARI_FIRE_NUM);
    for(var i = 0; i < hikari_fire.length; i++) {
        hikari_fire[i] = new Hikari_Fire();
    }
    // hikari head switch
    var hikari_head_switch = new Sprite(90, 90);
    var hikari_head_last_hit_frame = 0;
    hikari_head_switch.image = game.assets['shooting/switch.png'];
    hikari_head_switch.frame = HIKARI_BIG_FIRE_NUM;
    hikari_head_switch.x = hikari_head_switch.width/3;
    hikari_head_switch.y = height - hikari_head_switch.height*4/3;
    hikari_head_switch.addEventListener('touchstart', function() {
        if (hikari_head_count + 75 < game.frame && HIKARI_BIG_FIRE_NUM > 0) {
            HIKARI_BIG_FIRE_NUM--;
            hikari_head_switch.frame = HIKARI_BIG_FIRE_NUM;
            hikari_head_count = game.frame;
            hikari_head.tl
                .moveTo(hikari.x, hikari.y, 1)
                .scaleBy(6/5, 5, SIN_EASEINOUT)
                .scaleBy(5/6, 5, SIN_EASEINOUT)
                .scaleBy(7/5, 5, SIN_EASEINOUT)
                .scaleBy(5/7, 5, SIN_EASEINOUT)
                .scaleBy(8/5, 5, SIN_EASEINOUT)
                .moveTo(hikari.x, -width, 50, EXPO_EASEIN)
                .scaleBy(5/8, 1);
            hikari_head_light.tl
                .moveTo(hikari.x, hikari.y, 1)
                .scaleBy(3, 25)
                .moveTo(hikari.x, -width, 50, EXPO_EASEIN)
                .scaleBy(1/3, 1);
        }
    });
    
    var count = 0;
    scene.addEventListener("enterframe", function(e) {
        if(audio_back.ended || audio_back.paused){
            audio_back.play();
        }
        if(count % 10 == 0) {
            var num = select_fire_num(hikari_fire);
            if(num != -1) {
                scene.removeChild(hikari_fire[num]);
                hikari_fire[num].x = hikari.x + hikari.width/2 - hikari_fire[num].width/2;
                hikari_fire[num].y = hikari.y;
                hikari_fire[num].tl.moveY(-hikari_fire[num].height, 50);
                scene.addChild(hikari_fire[num]);
            }
        }
        count++;
    });
    scene.addChild(hikari_head_switch);
    
    /////////////////////////
    // device motion
    var angle  = 0;
    var past_angle = new Array(10);
    for (var i = 0; i < past_angle.length; i++) {
        past_angle[i] = 0;
    }
    window.addEventListener("devicemotion", function(e){
        for (var i = past_angle.length-1; i > 0; i--) {
            past_angle[i] = past_angle[i-1];
        }
        past_angle[0] = (Math.floor(100*e.accelerationIncludingGravity.x)/100+angle)/2;
        if (width/2/3*past_angle[0] > 290) {
            past_angle[0] = 290*2*3/width;
        } else if (width/2/3*past_angle[0] < -290) {
            past_angle[0] = -290*2*3/width;
        }
        angle = 0;
        for (var i = 0; i < past_angle.length; i++) {
            angle += past_angle[i]/past_angle.length;
        }
        hikari.x = width/2 - hikari.width/2 + width/2/3*angle;
        if (hikari_head_count == 0 || game.frame < hikari_head_count + 40) {
            hikari_head.x = hikari.x;
            hikari_head_light.x = hikari.x;
        }
    }, false);
    
    // how to play
    var how_pannel = new Sprite(500,500);
    how_pannel.image = game.assets['shooting/how_to_play.png'];
    how_pannel.x = width;
    how_pannel.y = (height - how_pannel.height)/2;
    how_pannel.tl.moveTo((width-how_pannel.width)/2, how_pannel.y, 30, BOUNCE_EASEOUT);
    scene.addChild(how_pannel);
    how_pannel.addEventListener('touchstart', function() {
        HIKARI_BIG_FIRE_NUM = 3;
       game.replaceScene(game.game2SelectScene()); 
    });
    return scene;
}

function shooting_start (game, scene) {
    // stop back music
    audio_back.pause();
    audio_back.currentTime = 0;
    // set music
    if(Shooting_Game_Music == 0) {
        audio_gurasura.play();
    } else if (Shooting_Game_Music == 1) {
        audio_hutari.play();
    } else if (Shooting_Game_Music == 2) {
        audio_yozora.play();
    }

    ///////////////////////////
    // background
    var bg1 = new Sprite(width, height);
    bg1.image = game.assets['shooting/shooting_back2.png'];
    scene.addChild(bg1);
    bg1.tl.moveTo(0, 0, 1).moveTo(0, height, height).loop();
    var bg2 = new Sprite(width, height);
    bg2.image = game.assets['shooting/shooting_back2.png'];
    scene.addChild(bg2);
    bg2.tl.moveTo(0, -height, 1).moveTo(0, 0, height).loop();
    
    /////////////////////////////
    // back button
    var back_b = new Sprite(61, 56);
    back_b.image = game.assets['back.png'];
    back_b.y = 0;
    back_b.x = width - back_b.width;
    back_b.addEventListener('touchstart', function() {
        //music stop
        if(Shooting_Game_Music == 0) {
            audio_gurasura.pause();
            audio_gurasura.currentTime = 0;
        } else if (Shooting_Game_Music == 1) {
            audio_hutari.pause();
            audio_hutari.currentTime = 0;
        } else if (Shooting_Game_Music == 2) {
            audio_yozora.pause();
            audio_yozora.currentTime = 0;
        }
        game.replaceScene(game.game2SelectScene());
    });
    scene.addChild(back_b);
    
    ///////////////////////////
    // point
    var point_digit = new Array(5);
    for (var i = 0; i < point_digit.length; i++) {
        point_digit[i] = new Sprite(POINT_HEIGHT, POINT_HEIGHT);
        point_digit[i].image = game.assets['shooting/shooting_point.png'];
        point_digit[i].x = width/3 - POINT_HEIGHT * (i + 1);
        point_digit[i].x += POINT_HEIGHT/4 * i;
        point_digit[i].y = 0;
        point_digit[i].frame = 0;
        scene.addChild(point_digit[i]);
    }
    HIGH_SCORE_FLAG = 0;
    
    ///////////////////////////
    // sign
    var start = new Start();
    start.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
    scene.addChild(start);
    var clear = new Clear();
    var gameover = new Shooting_GameOver();
    
    ///////////////////////////
    // hikari
    var hikari = new Hikari();
    hikari.x = (width - hikari.width)/2;
    hikari.y = height - hikari.height;
    scene.addChild(hikari);
    //hikari_head
    var hikari_head = new Hikari_Head();
    hikari_head.x = hikari.x;
    hikari_head.y = hikari.y;
    scene.addChild(hikari_head);
    //hikari_head_light
    var hikari_head_light = new Hikari_Head_Light();
    hikari_head_light.x = -hikari_head_light.width;
    hikari_head_light.y = -hikari_head_light.height;
    scene.addChild(hikari_head_light);
    // hikari head count
    var hikari_head_count = 0;
    // for DEBUG
//    scene.addEventListener("touchmove", function(e) {
//        if (Is_Touch != 0) {
//            hikari.x = e.localX - hikari.width/2;
//            if (hikari_head_count == 0 || game.frame < hikari_head_count + 40) {
//                hikari_head.x = hikari.x;
//                hikari_head_light.x = hikari.x;
//            }
//        }
//    });
    // hikari fire
    var hikari_fire = new Array(HIKARI_FIRE_NUM);
    for(var i = 0; i < hikari_fire.length; i++) {
        hikari_fire[i] = new Hikari_Fire();
    }
    // hikari head switch
    var hikari_head_switch = new Sprite(90, 90);
    var hikari_head_last_hit_frame = 0;
    hikari_head_switch.image = game.assets['shooting/switch.png'];
    hikari_head_switch.frame = HIKARI_BIG_FIRE_NUM;
    hikari_head_switch.x = hikari_head_switch.width/3;
    hikari_head_switch.y = height - hikari_head_switch.height*4/3;
    hikari_head_switch.addEventListener('touchstart', function() {
        if (hikari_head_count + 75 < game.frame && HIKARI_BIG_FIRE_NUM > 0) {
            HIKARI_BIG_FIRE_NUM--;
            hikari_head_switch.frame = HIKARI_BIG_FIRE_NUM;
            hikari_head_count = game.frame;
            hikari_head.tl
                .moveTo(hikari.x, hikari.y, 1)
                .scaleBy(6/5, 5, SIN_EASEINOUT)
                .scaleBy(5/6, 5, SIN_EASEINOUT)
                .scaleBy(7/5, 5, SIN_EASEINOUT)
                .scaleBy(5/7, 5, SIN_EASEINOUT)
                .scaleBy(8/5, 5, SIN_EASEINOUT)
                .moveTo(hikari.x, -width, 50, EXPO_EASEIN)
                .scaleBy(5/8, 1);
            hikari_head_light.tl
                .moveTo(hikari.x, hikari.y, 1)
                .scaleBy(3, 25)
                .moveTo(hikari.x, -width, 50, EXPO_EASEIN)
                .scaleBy(1/3, 1);
        }
    });
    scene.addChild(hikari_head_switch);
    // hikari dead ring
    var hikari_dead_ring = new Array(8);
    for (var i = 0; i < hikari_dead_ring.length; i++) {
        hikari_dead_ring[i] = new Sprite(30, 30);
        hikari_dead_ring[i].image = game.assets['shooting/dead_ring.png'];
    }
    
    ///////////////////////////
    // usa
    var usa = new Array(USA_NUM);
    var s = 1;
    for(var i = 0; i < usa.length; i++) {
        usa[i] = new Usa();
        if (i % 3 == 0) {
            usa[i].image = game.assets['shooting/enemy_usa1.png'];
        } else if (i % 3 == 1) {
            usa[i].image = game.assets['shooting/enemy_usa2.png'];
        } else if (i % 3 == 2) {
            usa[i].image = game.assets['shooting/enemy_usa3.png'];
        }
        set_usa_motion(usa[i], s);
        scene.addChild(usa[i]);
        s *= -1;
    }
    
    //////////////////////////
    // boss
    var boss;
    if (STAGE == 1) {
        boss = new Sakiwo();
        boss.tl.moveTo((width-boss.width)/2, -boss.height, 1)
            .delay(300)
            .moveTo((width-boss.width)/2, height/5, 100, ELASTIC_EASEOUT);
        scene.addChild(boss);
        var sakiwo_fire = new Array(SAKIWO_FIRE_NUM);
        for (var i = 0; i < sakiwo_fire.length; i++) {
            sakiwo_fire[i] = new Sakiwo_Fire();
        }
        set_appeared('hikari');
        set_appeared('usa');
    } else if (STAGE == 2) {
        boss = new Shunsuke();
        boss.x = -boss.width;
        boss.y = -boss.height;
        scene.addChild(boss);
    } else if (STAGE == 3) {
        boss = new Shingo();
        boss.x = -boss.width;
        boss.y = height/4;
        var shingo_fire = new Array(SHINGO_FIRE_NUM);
        for (var i = 0; i < shingo_fire.length; i++) {
            shingo_fire[i] = new Shingo_Fire();
        }
    } else if (STAGE == 4) {
        boss = new Airi();
        boss.x = -boss.width;
        boss.y = height/5;
        var airi_fire = new Array(AIRI_FIRE_NUM);
        for (var i = 0; i < airi_fire.length; i++) {
            airi_fire[i] = new Airi_Fire();
        }
    }
    
    /////////////////////////
    // hikari big fire item
    var item = new Sprite(60, 60);
    item.image = game.assets['shooting/hikari_big_fire_item.png'];
    item.x = -item.width;
    item.y = -item.height;
    item.tl.delay(Math.floor(Math.random()*500))
        .moveTo(Math.floor(width*Math.random()), -item.height, 1)
        .moveTo(Math.floor(width*Math.random()), height+item.height, 500);
    scene.addChild(item);
    var item_get = 0;
    
    /////////////////////////
    // device motion
    var angle  = 0;
    var past_angle = new Array(10);
    for (var i = 0; i < past_angle.length; i++) {
        past_angle[i] = 0;
    }
    window.addEventListener("devicemotion", function(e){
        for (var i = past_angle.length-1; i > 0; i--) {
            past_angle[i] = past_angle[i-1];
        }
        past_angle[0] = (Math.floor(100*e.accelerationIncludingGravity.x)/100+angle)/2;
        if (width/2/3*past_angle[0] > 290) {
            past_angle[0] = 290*2*3/width;
        } else if (width/2/3*past_angle[0] < -290) {
            past_angle[0] = -290*2*3/width;
        }
        angle = 0;
        for (var i = 0; i < past_angle.length; i++) {
            angle += past_angle[i]/past_angle.length;
        }
        hikari.x = width/2 - hikari.width/2 + width/2/3*angle;
        if (hikari_head_count == 0 || game.frame < hikari_head_count + 40) {
            hikari_head.x = hikari.x;
            hikari_head_light.x = hikari.x;
        }
    }, false);
    
    //////////////////////////
    // enterframe
    var count = 0;
    var gameover_count = 0;
    var clear_count = 0;
    var shunsuke_count = 0;
    scene.addEventListener("enterframe", function(e) {
        if(count % 100 == 0) {
        }
        if(count % 50 == 0) {
            // boss (shunsuke)
            if (count > 300) {
                if (STAGE == 2) {
                    set_appeared('shunsuke');
                    var shunsuke_x;
                    var shunsuke_y;
                    if (shunsuke_count == 0) {
                        shunsuke_x = width - boss.width;
                        shunsuke_y = Math.floor((height-boss.height*2)*Math.random());
                    } else if (shunsuke_count == 1) {
                        shunsuke_x = Math.floor((width-boss.width)*Math.random());
                        shunsuke_y = height - boss.height;
                    } else if (shunsuke_count == 2) {
                        shunsuke_x = 0;
                        shunsuke_y = Math.floor((height-boss.height*2)*Math.random());
                    } else {
                        shunsuke_x = Math.floor((width-boss.width)*Math.random());
                        shunsuke_y = 0;
                        shunsuke_count = -1;
                    }
                    boss.tl.moveTo(shunsuke_x, shunsuke_y, 50, SIN_EASEINOUT).and().rotateBy(360, 50);
                    shunsuke_count++;
                }
            }
        }
        if(count % 30 == 0) {
            // boss fire
            if(count > 300) {
                if(NOW != "CLEAR") {
                    if (STAGE == 1) {
                        set_appeared('sakiwo');
                        var num = select_fire_num(sakiwo_fire);
                        if(num != -1) {
                            scene.removeChild(sakiwo_fire[num]);
                            sakiwo_fire[num].x = boss.x + boss.width/2;
                            sakiwo_fire[num].y = boss.y + boss.height/2;
                            sakiwo_fire[num].tl.moveTo(Math.floor(width*Math.random()), height, 100);
                            scene.addChild(sakiwo_fire[num]);
                        }
                    } else if (STAGE == 3) {
                        var num = select_fire_num(shingo_fire);
                        if(num != -1) {
                            scene.removeChild(shingo_fire[num]);
                            shingo_fire[num].x = boss.x + boss.width/2 - 50;
                            shingo_fire[num].y = boss.y + boss.height/2 + 50;
                            shingo_fire[num].tl.moveTo(Math.floor(width*Math.random()), height, 100);
                            scene.addChild(shingo_fire[num]);
                        }
                        if (count == 330 && STAGE == 3) {
                            set_appeared('shingo');
                            scene.addChild(boss);
                            boss.tl.moveX(width-boss.width, 100, QUAD_EASEINOUT).moveX(0, 100, QUAD_EASEINOUT).loop();
                        }
                    } else if (STAGE == 4 && count % 60 == 0) {
                        var num = select_fire_num(airi_fire);
                        if(num != -1) {
                            scene.removeChild(airi_fire[num]);
                            airi_fire[num].x = boss.x;
                            airi_fire[num].y = boss.y;
                            airi_fire[num].tl.moveTo(Math.floor((width-airi_fire[num].width)*Math.random()), boss.y - height/4, 25, SIN_EASEOUT)
                                .and().rotateBy(180, 25)
                                .moveTo(Math.floor((width-airi_fire[num].width)*Math.random()), height+airi_fire[num].height, 100, SIN_EASEIN)
                                .and().rotateBy(720, 100);
                            scene.addChild(airi_fire[num]);
                        }
                        if (count == 360 && STAGE == 4) {
                            set_appeared('airi');
                            scene.addChild(boss);
                            boss.tl.moveX(width-boss.width, 100, QUAD_EASEINOUT).moveX(0, 100, QUAD_EASEINOUT).loop();
                        }
                    }
                }
            }
        }
        if(count % 10 == 0) {
            if(NOW != "GAMEOVER") {
                var num = select_fire_num(hikari_fire);
                if(num != -1) {
                    scene.removeChild(hikari_fire[num]);
                    hikari_fire[num].x = hikari.x + hikari.width/2 - hikari_fire[num].width/2;
                    hikari_fire[num].y = hikari.y;
                    hikari_fire[num].tl.moveY(-hikari_fire[num].height, 50);
                    scene.addChild(hikari_fire[num]);
                }
            }
        }
        if(count % 2 == 0) {
            // set music
            if(Shooting_Game_Music == 0) {
                if (audio_gurasura.paused) {
                    audio_gurasura.play();
                } else if (audio_gurasura.ended) {
                    Shooting_Game_Music = 1;
                    audio_hutari.play();
                }
            } else if (Shooting_Game_Music == 1) {
                if (audio_hutari.paused) {
                    audio_hutari.play();
                } else if (audio_hutari.ended) {
                    Shooting_Game_Music = 2;
                    audio_yozora.play();
                }
            } else if (Shooting_Game_Music == 2) {
                if (audio_yozora.paused) {
                    audio_yozora.play();
                } else if (audio_yozora.ended) {
                    Shooting_Game_Music = 0;
                    audio_gurasura.play();
                }
            }
            // get item
            if (is_collisioned(hikari, item) && item_get == 0) {
                scene.removeChild(item);
                HIKARI_BIG_FIRE_NUM++;
                hikari_head_switch.frame = HIKARI_BIG_FIRE_NUM;
                item_get = 1;
            }
            // hikari_big_fire vs usa & boss
            if (hikari_head_count + 75 > game.frame) {
                for (var i = 0; i < usa.length; i++) {
                    if (is_collisioned(hikari_head, usa[i]) == 1 && NOW == "PLAYING") {
                        if(usa[i].hp <= 10) {
                            POINT+=10;
                            // lose usa motion
                            var lose_usa = new Usa();
                            lose_usa.x = usa[i].x;
                            lose_usa.y = usa[i].y;
                            if (i % 3 == 1) {
                                lose_usa.image = game.assets['shooting/enemy_usa2.png'];
                            } else if (i % 3 == 2) {
                                lose_usa.image = game.assets['shooting/enemy_usa3.png'];
                            }
                            scene.addChild(lose_usa);
                            lose_usa.tl.moveTo(Math.floor(2*(width-lose_usa.width)*Math.random()), -usa[0].height ,30).and().rotateBy(1800, 30).removeFromScene();
                            // usa clear
                            usa[i].tl.clear();
                            set_usa_motion(usa[i], s);
                            s *= -1;
                            usa[i].hp = USA_HP;
                        } else {
                            POINT+=1;
                            usa[i].hp-=10;
                        }
                    }
                }
                if(is_collisioned(hikari_head, boss) && NOW == "PLAYING" && hikari_head_last_hit_frame + 75 < game.frame) {
                    hikari_head_last_hit_frame = game.frame;
                    if(boss.hp <= 10) {
                        POINT+=100;
                        NOW = "CLEAR";
                        var lose_boss;
                        if (STAGE == 1) {
                            lose_boss = new Sakiwo();
                        } else if (STAGE == 2) {
                            lose_boss = new Shunsuke();
                        } else if (STAGE == 3) {
                            lose_boss = new Shingo();
                        } else if (STAGE == 4) {
                            lose_boss = new Airi();
                        }
                        lose_boss.x = boss.x;
                        lose_boss.y = boss.y;
                        scene.addChild(lose_boss);
                        lose_boss.tl.moveTo(Math.floor(2*width*Math.random()), -lose_boss.height ,60).and().rotateBy(1800, 60).removeFromScene();
                        boss.y = -boss.height;
                        scene.removeChild(boss);
                        clear.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                        scene.addChild(clear);
                        if (STAGE == 4) {
                            var next_stage_pannel = new Sprite(560, 150);
                            next_stage_pannel.image = game.assets['shooting/all_stage_clear.png'];
                            next_stage_pannel.x = (width - next_stage_pannel.width)/2;
                            next_stage_pannel.y = height/4;
                            scene.addChild(next_stage_pannel);
                        }
                    } else {
                        POINT+=1;
                        boss.hp-=10;
                    }
                }
            }
            // hikari_fire vs usa & boss
            for (var i = 0; i < hikari_fire.length; i++) {
                if (hikari_fire[i].y > 0) {
                    for (var j = 0; j < usa.length; j++) {
                        if(is_collisioned(hikari_fire[i], usa[j]) == 1 && NOW == "PLAYING") {
                            if(usa[j].hp <= 1) {
                                POINT+=10;
                                // lose usa motion
                                var lose_usa = new Usa();
                                lose_usa.x = usa[j].x;
                                lose_usa.y = usa[j].y;
                                if (j % 3 == 1) {
                                    lose_usa.image = game.assets['shooting/enemy_usa2.png'];
                                } else if (j % 3 == 2) {
                                    lose_usa.image = game.assets['shooting/enemy_usa3.png'];
                                }
                                scene.addChild(lose_usa);
                                lose_usa.tl.moveTo(Math.floor(2*(width-lose_usa.width)*Math.random()), -usa[0].height ,30).and().rotateBy(1800, 30).removeFromScene();
                                // usa clear
                                usa[j].tl.clear();
                                set_usa_motion(usa[j], s);
                                s *= -1;
                                usa[j].hp = USA_HP;
                            } else {
                                POINT++;
                                usa[j].hp--;
                            }
                            hikari_fire[i].tl.clear();
                            hikari_fire[i].y = -hikari_fire[i].width;
                        }
                    }
                    if(is_collisioned(hikari_fire[i], boss) && NOW == "PLAYING") {
                        if(boss.hp <= 1) {
                            POINT+=100;
                            NOW = "CLEAR";
                            var lose_boss;
                            if (STAGE == 1) {
                                lose_boss = new Sakiwo();
                            } else if (STAGE == 2) {
                                lose_boss = new Shunsuke();
                            } else if (STAGE == 3) {
                                lose_boss = new Shingo();
                            } else if (STAGE == 4) {
                                lose_boss = new Airi();
                            }
                            lose_boss.x = boss.x;
                            lose_boss.y = boss.y;
                            scene.addChild(lose_boss);
                            lose_boss.tl.moveTo(Math.floor(2*width*Math.random()), -lose_boss.height ,60).and().rotateBy(1800, 60).removeFromScene();
                            boss.y = -boss.height;
                            scene.removeChild(boss);
                            clear.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                            scene.addChild(clear);
                            if (STAGE == 4) {
                                var next_stage_pannel = new Sprite(560, 150);
                                next_stage_pannel.image = game.assets['shooting/all_stage_clear.png'];
                                next_stage_pannel.x = (width - next_stage_pannel.width)/2;
                                next_stage_pannel.y = height/4;
                                scene.addChild(next_stage_pannel);
                            }
                        } else {
                            POINT++;
                            boss.hp--;
                        }
                        hikari_fire[i].tl.clear();
                        hikari_fire[i].y = -hikari_fire[i].width;
                    }
                }
            }
            // hikari vs usa
            for (var i = 0; i < usa.length; i++) {
                if (usa[i].y > height - usa[i].y - hikari.y && NOW == "PLAYING") {
                    if (is_collisioned(usa[i], hikari)) {
                        scene.removeChild(hikari);
                        scene.removeChild(hikari_head);
                        NOW = "GAMEOVER";
                        gameover.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                        scene.addChild(gameover);
                    }
                }
            }
            // hikari vs boss
            if (boss.y > height - boss.y - hikari.y && NOW == "PLAYING") {
                if (is_collisioned(boss, hikari)) {
                    scene.removeChild(hikari);
                    scene.removeChild(hikari_head);
                    NOW = "GAMEOVER";
                    gameover.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                    scene.addChild(gameover);
                }
            }
            // hikari vs sakiwo_fire
            if (STAGE == 1) {
                for (var i = 0; i < sakiwo_fire.length; i++) {
                    if (sakiwo_fire[i].y > height - sakiwo_fire[i].y - hikari.y && NOW == "PLAYING") {
                        if (is_collisioned(sakiwo_fire[i], hikari)) {
                            scene.removeChild(hikari);
                            scene.removeChild(hikari_head);
                            scene.removeChild(hikari_head_light);
                            NOW = "GAMEOVER";
                            gameover.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                            scene.addChild(gameover);
                        }
                    }
                }
            } else if (STAGE == 3) {
                for (var i = 0; i < shingo_fire.length; i++) {
                    if (shingo_fire[i].y > height - shingo_fire[i].y - hikari.y && NOW == "PLAYING") {
                        if (is_collisioned(shingo_fire[i], hikari)) {
                            scene.removeChild(hikari);
                            scene.removeChild(hikari_head);
                            scene.removeChild(hikari_head_light);
                            NOW = "GAMEOVER";
                            gameover.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                            scene.addChild(gameover);
                        }
                    }
                }
            } else if (STAGE == 4) {
                for (var i = 0; i < airi_fire.length; i++) {
                    if (airi_fire[i].y > height - airi_fire[i].y - hikari.y && NOW == "PLAYING") {
                        if (is_collisioned(airi_fire[i], hikari)) {
                            scene.removeChild(hikari);
                            scene.removeChild(hikari_head);
                            scene.removeChild(hikari_head_light);
                            NOW = "GAMEOVER";
                            gameover.tl.hide().moveTo((width-start.width)/2, (height-start.height)/2, 1).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).fadeIn(15).fadeOut(15).removeFromScene();
                            scene.addChild(gameover);
                        }
                    }
                }
            }
            
            // after gameover or clear
            if (NOW == "GAMEOVER") {
                // display ring
                if (gameover_count == 0) {
                    for(var i = 0; i < hikari_dead_ring.length; i++) {
                        hikari_dead_ring[i].x = hikari.x + (hikari.width - hikari_dead_ring[i].width)/2;
                        hikari_dead_ring[i].y = hikari.y + (hikari.height - hikari_dead_ring[i].height)/2
                        hikari_dead_ring[i].tl.moveBy(500*Math.sin(Math.PI/4*i), 500*Math.cos(Math.PI/4*i), 90);
                        scene.addChild(hikari_dead_ring[i]);
                    }
                    if(HIGH_SCORE_FLAG == 1) {
                        var high_score_string = new Sprite(280, 56);
                        high_score_string.image = game.assets['shooting/high_score.png'];
                        high_score_string.x = (width-high_score_string.width)/2;
                        high_score_string.y = height/3;
                        scene.addChild(high_score_string);
                    }
                }
                gameover_count += 2;
                if (gameover_count == 90) {
                    gameover_count = 0;
                    NOW = "PLAYING";
                    STAGE = 1;
                    POINT = 0;
                    HIKARI_BIG_FIRE_NUM = 3;
                    USA_NUM = 3;
                    //music stop
                    if(Shooting_Game_Music == 0) {
                        audio_gurasura.pause();
                        audio_gurasura.currentTime = 0;
                    } else if (Shooting_Game_Music == 1) {
                        audio_hutari.pause();
                        audio_hutari.currentTime = 0;
                    } else if (Shooting_Game_Music == 2) {
                        audio_yozora.pause();
                        audio_yozora.currentTime = 0;
                    }
                    game.replaceScene(game.game2SelectScene());
                }
            } else if (NOW == "CLEAR") {
                clear_count += 2;
                if (clear_count == 90) {
                    clear_count = 0;
                    NOW = "PLAYING";
                    if (STAGE != 4) {
                        STAGE++;
                    } else if (STAGE == 4) {
                        STAGE = 1;
                        USA_NUM += 3;
                    }
                    game.replaceScene(game.game2Scene());
                }
            }
            update_point(POINT, point_digit);
            if (POINT > get_high_score()) {
                HIGH_SCORE_FLAG = 1;
                set_high_score(POINT);
            }
        }
        count++;
    });
    return scene;
}