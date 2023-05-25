window.focus;
let myCanvas = document.getElementById("myCanvas");
var element = document.getElementById("canvas");
let c = myCanvas.getContext("2d");

myCanvas.height = window.innerHeight;
myCanvas.width = window.innerWidth;

let player1 = {
  y: 300,
  x: 1000,
  speed: 3,
  angle: 0,
  rotateSpeed: 4,
  recWidth: 20,
  recHeight: 20,
  alive: true,
};

let player2 = {
  y: 300,
  x: 200,
  speed: 3,
  angle: 0,
  rotateSpeed: 4,
  recWidth: 20,
  recHeight: 20,
  alive: true,
};

// let player = {
//   y: 100,
//   x: 100,
//   speed: 3,
//   angle: 0,
//   rotateSpeed: 6,
//   recWidth: 20,
//   recHeight: 20,
// }

let bullets = [];

let directions1 = {
  left: false,
  right: false,
  up: false,
  down: false,
  shoot: false,
};

let directions2 = {
  left: false,
  right: false,
  up: false,
  down: false,
  shoot: false,
};

let timeCount = 0;
// function timer(bullets, bullet) {
//   timeCount += 1;
//   // console.log(timeCount);

//   for (let i = 0; i < bullets.length; i++) {
//     // bullet = bullets[i];
//     console.log(bullet.birth);
//     if (timeCount > bullet.birth + bullet.lifeTime) {
//       console.log("huhfewjfewjfwfliewfew");
//       bullets.splice(bullets[i], 1);
//     }
//   }
//   // bullets.forEach((bullet) => {
//   //   if (timeCount > bullet.birth + bullet.lifeTime) {
//   //     bullets.splice();
//   //   }
//   // });
// }
function timer(bullets) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i]; // Get the current bullet from the array
    console.log(bullet.age);
    if (bullet.age > bullet.lifetime) {
      console.log("huhfewjfewjfwfliewfew");
      bullets.splice(i, 1); // Remove the bullet at index i
    }
  }
}

// }
setInterval(function () {
  timer(bullets);
}, 1);

function createBullet(y, x, angle) {
  let bullet = {
    y: 0,
    x: 0,
    radius: 2,
    color: "black",
    speed: 5,
    angle: 0,
    age: 0,
    lifetime: 230 + Math.random() * 40,
  };

  bullet.y = y + 30 * Math.sin(((angle + 180) / 180) * Math.PI);
  bullet.x = x + 30 * Math.cos(((angle + 180) / 180) * Math.PI);
  bullet.angle = angle + 180;

  // else if (player2 == 1){
  //   bullet.y =<
  //     player2.y + 25 * Math.cos(((player2.angle + 180) / 180) * Math.PI);
  //   bullet.x =
  //     player2.x + 25 * Math.cos(((player2.angle + 180) / 180) * Math.PI);
  //   bullet.angle = player2.angle + 180;
  // }

  bullets.push(bullet);
}
let walls = [];
function createWall() {
  let wall = {
    x: 250 + Math.floor(Math.random() * 500),
    y: Math.floor(Math.random() * 605),
    width: Math.floor(Math.random() * 200),
    height: Math.floor(Math.random() * 200),
  };

  walls.push(wall);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions1.left = true;
      break;
    case "ArrowRight":
      directions1.right = true;
      break;
    case "ArrowUp":
      directions1.up = true;
      break;
    case "ArrowDown":
      directions1.down = true;
      break;

    default:
      break;
  }
});

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      directions2.left = true;
      break;
    case "d":
      directions2.right = true;
      break;
    case "w":
      directions2.up = true;
      break;
    case "s":
      directions2.down = true;
      break;

    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions1.left = false;
      break;
    case "ArrowRight":
      directions1.right = false;
      break;
    case "ArrowUp":
      directions1.up = false;
      break;
    case "ArrowDown":
      directions1.down = false;
      break;
    case "l":
      // console.log("shoot");
      createBullet(player1.y, player1.x, player1.angle);
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      directions2.left = false;
      break;
    case "d":
      directions2.right = false;
      break;
    case "w":
      directions2.up = false;
      break;
    case "s":
      directions2.down = false;
      break;
    case "q":
      // console.log("shoot");
      createBullet(player2.y, player2.x, player2.angle);
      break;
    default:
      break;
  }
});

function winScreen(winner) {
  element.insertAdjacentHTML(
    "beforeend",
    `<h1 id="winScreen">${winner} won!</h1>`
  );
}

// document.addEventListener("keydown", (e) => {});

for (let i = 0; i < 10; i++) {
  createWall();
  console.log(walls);
}

function animate() {
  bullets.forEach((bullet) => {
    bullet.age += 1;
    timer(bullet);
  });

  requestAnimationFrame(animate);
  c.clearRect(0, 0, 9999999, 999999999);

  // Walls
  walls.forEach((wall) => {
    c.beginPath();
    c.fillRect(wall.x, wall.y, wall.width, wall.height);
    c.stroke();

    // player1
    if (
      player1.x + 15 > wall.x &&
      player1.x - 15 < wall.x + wall.width &&
      player1.y + 15 > wall.y &&
      player1.y - 15 < wall.y + wall.height &&
      directions1.up
    ) {
      player1.y += player1.speed * Math.sin((player1.angle / 180) * Math.PI);
      player1.x += player1.speed * Math.cos((player1.angle / 180) * Math.PI);
      tank1.style.top = `${player1.y - 12.5}px`;
      tank1.style.left = `${player1.x - 25}px`;
      tank1.style.transform = `rotate(${player1.angle}deg)`;
    }
    if (
      player1.x + 15 > wall.x &&
      player1.x - 15 < wall.x + wall.width &&
      player1.y + 15 > wall.y &&
      player1.y - 15 < wall.y + wall.height &&
      directions1.down
    ) {
      player1.y -= player1.speed * Math.sin((player1.angle / 180) * Math.PI);
      player1.x -= player1.speed * Math.cos((player1.angle / 180) * Math.PI);
      tank1.style.top = `${player1.y - 12.5}px`;
      tank1.style.left = `${player1.x - 25}px`;
      tank1.style.transform = `rotate(${player1.angle}deg)`;
    }

    // player2

    if (
      player2.x + 15 > wall.x &&
      player2.x - 15 < wall.x + wall.width &&
      player2.y + 15 > wall.y &&
      player2.y - 15 < wall.y + wall.height &&
      directions2.up
    ) {
      player2.y += player2.speed * Math.sin((player2.angle / 180) * Math.PI);
      player2.x += player2.speed * Math.cos((player2.angle / 180) * Math.PI);
      tank2.style.top = `${player2.y - 12.5}px`;
      tank2.style.left = `${player2.x - 25}px`;
      tank2.style.transform = `rotate(${player1.angle}deg)`;
    }
    if (
      player2.x + 15 > wall.x &&
      player2.x - 15 < wall.x + wall.width &&
      player2.y + 15 > wall.y &&
      player2.y - 15 < wall.y + wall.height &&
      directions2.down
    ) {
      player2.y -= player2.speed * Math.sin((player2.angle / 180) * Math.PI);
      player2.x -= player2.speed * Math.cos((player2.angle / 180) * Math.PI);
      tank2.style.top = `${player2.y - 12.5}px`;
      tank2.style.left = `${player2.x - 25}px`;
      tank2.style.transform = `rotate(${player2.angle}deg)`;
    }
  });

  // c.beginPath();
  // c.fillRect(100, 100, 100, 100);
  // c.stroke();
  //Här skriver ni kod som körs en gång varjee "frame"

  // c.fillRect(player1.x, player1.y, player1.recWidth, player1.recHeight);

  let tank1 = document.getElementById("tank1");
  let tank2 = document.getElementById("tank2");

  let explode = document.getElementById("explode");
  // let explode = document.getElementById("explode");

  // function bulletBounce(bullets) {
  //   for (let i = 0; i < bullets.length; i++) {
  //     bullets[i].bounces += 1;
  //     if (bullets[i].bounces == 3) {
  //       bullets.splice(bullets[i]);
  //     }
  //     console.log(bullets[i].bounces);
  //   }
  // }

  bullets.forEach((bullet) => {
    c.beginPath();
    c.arc(bullet.x, bullet.y, bullet.radius, 0, 2 * Math.PI);
    c.fill();
    c.stroke();

    bullet.y += bullet.speed * Math.sin((bullet.angle / 180) * Math.PI);
    bullet.x += bullet.speed * Math.cos((bullet.angle / 180) * Math.PI);

    if (bullet.x < 0 || bullet.x > 1195) {
      bullet.angle = 180 - bullet.angle;
      bullet.bounces += 1;
    } else if (bullet.y < 0 || bullet.y > 600) {
      bullet.angle = 360 - bullet.angle;
      bullet.bounces += 1;

      // bulletBounce(bullets);
    }

    walls.forEach((wall) => {
      if (
        bullet.x + 5 > wall.x &&
        bullet.x - 5 < wall.x + wall.width &&
        bullet.y + 5 > wall.y &&
        bullet.y - 5 < wall.y + wall.height
      ) {
        if (bullet.y - 0 > wall.y && bullet.y - 0 < wall.y + wall.height) {
          bullet.angle = 180 - bullet.angle;
          bullet.bounces += 1;
          // if (bullet.bounces == bullet.durability) {
          //   bullets.splice(bullets[bullet]);
          // }
          // bulletBounce(bullets);
        } else {
          bullet.angle = 360 - bullet.angle;
          bullet.bounces += 1;
          // if (bullet.bounces == bullet.durability) {
          //   bullets.splice(bullets[bullet]);
          // }
          // bulletBounce(bullets);
        }

        // } else if (bullet.y < 0 || bullet.y > 500) {
        //   bullet.angle = 360 - bullet.angle;
        // bulletBounce(bullets);
      }
      // bulletBounce(bullets);
    });

    // console.log(bullet.angle);

    if (
      bullet.x > player1.x - 25 &&
      bullet.x < player1.x + 25 &&
      bullet.y > player1.y - 25 &&
      bullet.y < player1.y + 25
    ) {
      player1.alive = false;
      console.log("hit1");
      tank1.style.opacity = "0";
      explode.style.top = `${player1.y - 40}px`;
      explode.style.left = `${player1.x - 30}px`;
      explode.style.opacity = "1";
      player2.alive = true;
      winScreen("Player 2");
    }
    if (
      bullet.x > player2.x - 25 &&
      bullet.x < player2.x + 25 &&
      bullet.y > player2.y - 25 &&
      bullet.y < player2.y + 25
    ) {
      player2.alive = false;
      console.log("hit2");
      tank2.style.opacity = "0";
      explode.style.top = `${player2.y - 40}px`;
      explode.style.left = `${player2.x - 30}px`;
      explode.style.opacity = "1";
      player2.alive = true;
      winScreen("Player 1");
    }

    // forEaxh;
  });

  if (directions1.right) {
    player1.angle += player1.rotateSpeed;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }

  if (directions1.left) {
    player1.angle -= player1.rotateSpeed;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }

  if (directions1.up) {
    player1.y -= player1.speed * Math.sin((player1.angle / 180) * Math.PI);
    player1.x -= player1.speed * Math.cos((player1.angle / 180) * Math.PI);
    tank1.style.top = `${player1.y - 12.5}px`;
    tank1.style.left = `${player1.x - 25}px`;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }

  if (directions1.down) {
    player1.y += player1.speed * Math.sin((player1.angle / 180) * Math.PI);
    player1.x += player1.speed * Math.cos((player1.angle / 180) * Math.PI);
    tank1.style.top = `${player1.y - 12.5}px`;
    tank1.style.left = `${player1.x - 25}px`;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }

  if (
    (player1.x > 1195 || player1.y > 600 || player1.x < 0 || player1.y < 0) &&
    directions1.up
  ) {
    player1.y += player1.speed * Math.sin((player1.angle / 180) * Math.PI);
    player1.x += player1.speed * Math.cos((player1.angle / 180) * Math.PI);
    tank1.style.top = `${player1.y - 12.5}px`;
    tank1.style.left = `${player1.x - 25}px`;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }
  if (
    (player1.x > 1195 || player1.y > 600 || player1.x < 0 || player1.y < 0) &&
    directions1.down
  ) {
    player1.y -= player1.speed * Math.sin((player1.angle / 180) * Math.PI);
    player1.x -= player1.speed * Math.cos((player1.angle / 180) * Math.PI);
    player1.y.toString();
    tank1.style.top = `${player1.y - 12.5}px`;
    tank1.style.left = `${player1.x - 25}px`;
    tank1.style.transform = `rotate(${player1.angle}deg)`;
  }

  // -------------------P2

  if (directions2.right) {
    player2.angle += player2.rotateSpeed;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }

  if (directions2.left) {
    player2.angle -= player2.rotateSpeed;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }

  if (directions2.up) {
    player2.y -= player2.speed * Math.sin((player2.angle / 180) * Math.PI);
    player2.x -= player2.speed * Math.cos((player2.angle / 180) * Math.PI);
    tank2.style.top = `${player2.y - 12.5}px`;
    tank2.style.left = `${player2.x - 25}px`;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }

  if (directions2.down) {
    player2.y += player2.speed * Math.sin((player2.angle / 180) * Math.PI);
    player2.x += player2.speed * Math.cos((player2.angle / 180) * Math.PI);
    tank2.style.top = `${player2.y - 12.5}px`;
    tank2.style.left = `${player2.x - 25}px`;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }

  if (
    (player2.x > 1195 || player2.y > 600 || player2.x < 0 || player2.y < 0) &&
    directions2.up
  ) {
    player2.y += player2.speed * Math.sin((player2.angle / 180) * Math.PI);
    player2.x += player2.speed * Math.cos((player2.angle / 180) * Math.PI);
    tank2.style.top = `${player2.y - 12.5}px`;
    tank2.style.left = `${player2.x - 25}px`;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }
  if (
    (player2.x > 1195 || player2.y > 600 || player2.x < 0 || player2.y < 0) &&
    directions2.down
  ) {
    player2.y -= player2.speed * Math.sin((player2.angle / 180) * Math.PI);
    player2.x -= player2.speed * Math.cos((player2.angle / 180) * Math.PI);
    player2.y.toString();
    tank2.style.top = `${player2.y - 12.5}px`;
    tank2.style.left = `${player2.x - 25}px`;
    tank2.style.transform = `rotate(${player2.angle}deg)`;
  }

  // if (directions1.shoot) {
  //   // console.log("shoot");
  //   createBullet();
  // }
}

animate();
