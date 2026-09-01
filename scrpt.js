let a = document.getElementById('play');
let b = document.getElementById('progressbar');
let audio = new Audio('songs/1.mp3');
let currenttrack = 0;
let currentsong = 1;
let prev = 1;
let repeat = false;
let shuffle = false;

let f = document.querySelector('.music_play');
function updateProgress() {
    if (!audio.duration) return;

    let currentime = (audio.currentTime / audio.duration) * 100;
    b.value = currentime;
    b.style.background =
        `linear-gradient(to right, green ${b.value}%, #333 ${b.value}%)`;
}
audio.addEventListener('ended', () => {

    if(repeat){
        audio.currentTime = 0;
        audio.play();

    }
    else{
        nextsong();
        updatenav();
    }
})

// Bottom play / pause
a.addEventListener('click', () => {
    let p = document.getElementById(`${currentsong}`);
    if (audio.paused || audio.currentTime === 0) {
        audio.play();
        a.classList.remove('fa-play');
        a.classList.add('fa-pause');
        p.classList.remove('fa-circle-play');
        p.classList.add('fa-circle-pause');

    } else {
        audio.pause();
        a.classList.remove('fa-pause');
        a.classList.add('fa-play');
        p.classList.remove('fa-circle-pause');
        p.classList.add('fa-circle-play');
    }
});


audio.addEventListener('timeupdate', updateProgress);


b.addEventListener('input', function () {
    let value = this.value;
    audio.currentTime = (value * audio.duration) / 100;
    this.style.background =
        `linear-gradient(to right, green ${value}%, #333 ${value}%)`;
});

// Song cards
let music_btn = Array.from(document.getElementsByClassName('music_btn'));

function all_play() {
    music_btn.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}

music_btn.forEach((element) => {
    element.addEventListener('click', function () {

        if (this.classList.contains("fa-circle-play")) {

            audio.pause();

            if (audio.paused || audio.currentTime === 0) {
                if (currenttrack == this.id) {
                    all_play();
                    audio.play();
                    this.classList.remove('fa-circle-play');
                    this.classList.add('fa-circle-pause');
                    a.classList.remove('fa-play');
                    a.classList.add('fa-pause');

                } else {
                    f.classList.remove('display');
                    all_play();
                    this.classList.remove('fa-circle-play');
                    this.classList.add('fa-circle-pause');
                    var t = parseInt(this.id);
                    currenttrack = t;
                    currentsong = t;


                    audio.removeEventListener('timeupdate', updateProgress);


                    audio.src = `songs/${t}.mp3`;

                    audio.addEventListener('loadedmetadata', () => {

                        audio.currentTime = 0;


                        b.value = 0;
                        b.style.background =
                            `linear-gradient(to right, green 0%, #333 0%)`;


                        audio.addEventListener('timeupdate', updateProgress);

                        audio.play();
                        a.classList.remove('fa-play');
                        a.classList.add('fa-pause');
                        updatenav();

                    }, { once: true });
                }
            }

        } else {
            audio.pause();
            all_play();
            a.classList.remove('fa-pause');
            a.classList.add('fa-play');
        }
    })
})
function nextsong() {
    let next = (currentsong + 1) % music_btn.length;
    currentsong = next == 0 ? music_btn.length : next;
    audio.src =order[currentsong-1].songPath;
    let z = order[currentsong-1].id;
    let d=document.getElementById(z);
   
    all_play();
    d.classList.remove('fa-circle-play');
    d.classList.add('fa-circle-pause');
    a.classList.remove('fa-play');
    a.classList.add('fa-pause');
    audio.play()
}
let e = document.getElementById('next');
e.addEventListener('click', () => {
    nextsong();
})
function prevsong() {
    prev = (currentsong - 1) % music_btn.length;
    currentsong = prev == 0 ? music_btn.length : prev;
    audio.src = order[currentsong-1].songPath;
    let d = document.getElementById(`${currentsong}`);
    all_play();
    d.classList.remove('fa-circle-play');
    d.classList.add('fa-circle-pause');
    a.classList.remove('fa-play');
    a.classList.add('fa-pause');
    audio.play()
}
let g = document.getElementById('prev');
g.addEventListener('click', () => {
    prevsong();
})
let i = document.getElementById('repeat');
let j = document.getElementById('shuffle');
i.addEventListener('click', () => {
    if (!repeat) {
        repeat = true;
        shuffle = false;
        i.classList.add('active');
        j.classList.remove('active');
    }
    else {
        repeat = false;
        i.classList.remove('active');
    }
});
j.addEventListener('click', () => {
    if (!shuffle) {
        shuffle = true;
        repeat = false;
        j.classList.add('active');
        i.classList.remove('active');
        order=shuffle2(order);
    }
    else {
        shuffle = false;
        j.classList.remove('active');
        order=songs;
        
    }
});
let songs = [
  { id: 1, songName: 'Ghar Kab Aaoge (From BORDER 2)', songDesc: 'Anu Malik, Mithoon, Sonu Nigam, Arijit Singh', songPath: 'songs/1.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e025be30e0d058181d80d470511' },

  { id: 2, songName: 'Not Guilty', songDesc: 'Danda Nyoliwala', songPath: 'songs/2.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e020c8806717b030da10e9fd336' },

  { id: 3, songName: 'Ishq Da Chehra', songDesc: 'Diljit Dosanjh, Sachet Tandon, Parampara', songPath: 'songs/3.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e02ea7d62378c06c9984179fd4f' },

  { id: 4, songName: 'Sahana Sahana', songDesc: 'Thaman S, Vishal Mishra, Sruthi Ranjani, Krishna', songPath: 'songs/4.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e02f5d567d7268408300e0f66d6' },

  { id: 5, songName: 'Hook Step', songDesc: 'Bheems Ceciroleo, Baba Sehgal, Ramajogayya Sastry', songPath: 'songs/5.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e021d5e5118400187e7421295d0' },

  { id: 6, songName: 'Khat', songDesc: 'Navjot Ahuja', songPath: 'songs/6.mp3', songImage: 'https://i.scdn.co/image/ab67616d00001e02c9388d52281101181ecb4ea4' },

  { id: 7, songName: 'Pritam', songDesc: 'Artist', songPath: 'songs/7.mp3', songImage: 'https://i.scdn.co/image/ab67616100005174cb6926f44f620555ba444fca' },

  { id: 8, songName: 'A.R Rahman', songDesc: 'Artist', songPath: 'songs/8.mp3', songImage: 'https://i.scdn.co/image/ab67616100005174b19af0ea736c6228d6eb539c' },

  { id: 9, songName: 'Arjit Singh', songDesc: 'Artist', songPath: 'songs/9.mp3', songImage: 'https://i.scdn.co/image/ab676161000051745ba2d75eb08a2d672f9b69b7' },

  { id: 10, songName: 'Sachin-Jigar', songDesc: 'Artist', songPath: 'songs/10.mp3', songImage: 'https://i.scdn.co/image/ab67616100005174bb4064bef3a825344d5eb79e' },

  { id: 11, songName: 'Vishal-Shekar', songDesc: 'Artist', songPath: 'songs/11.mp3', songImage: 'https://i.scdn.co/image/ab6761610000517490b6c3d093f9b02aad628eaf' },

  { id: 12, songName: 'Atif Aslam', songDesc: 'Artist', songPath: 'songs/12.mp3', songImage: 'https://i.scdn.co/image/ab67616100005174c40600e02356cc86f0debe84' },

  { id: 13, songName: 'Dooron Dooron', songDesc: 'Paresh Pahuja, Shiv Tandan, Meghdeep Bose', songPath: 'songs/13.mp3', songImage: 'https://picsum.photos/id/1011/300/300' },

  { id: 14, songName: 'Adi Alaye', songDesc: 'G V Prakash, Sean Roldan, Dhee, Ekadesi', songPath: 'songs/14.mp3', songImage: 'https://picsum.photos/id/1025/300/300' },

  { id: 15, songName: 'Puthu Mazha', songDesc: 'Justin Prabhakaran, Shakthisree Gopalan', songPath: 'songs/15.mp3', songImage: 'https://picsum.photos/id/1027/300/300' },

  { id: 16, songName: 'Aathi', songDesc: 'Anirudh Ravichander, Vishal Dadlani', songPath: 'songs/16.mp3', songImage: 'https://picsum.photos/id/1035/300/300' },

  { id: 17, songName: 'Ishqa Ve', songDesc: 'Zeeshan Ali, Yuvraj Tung', songPath: 'songs/17.mp3', songImage: 'https://picsum.photos/id/1033/300/300' },

  { id: 18, songName: 'Meri Zindagi Hai Tu', songDesc: 'Asim Azhar, Sabri Sisters', songPath: 'songs/18.mp3', songImage: 'https://picsum.photos/id/1041/300/300' },
];
let order=[...songs];
let musics=Array.from(document.getElementsByClassName('musics'));
musics.forEach((element,i)=>{
  element.getElementsByTagName('img')[0].src=songs[i].songImage;
  element.getElementsByClassName('title')[0].innerText=songs[i].songName;
  element.getElementsByClassName('desc')[0].innerText=songs[i].songDesc;
})
function shuffle2(orginalorder){
    let order=[...orginalorder];
    for(let i=order.length-1;i>0;i--){
 let j=Math.floor(Math.random()*(i+1));
 [order[i],order[j]]=[order[j],order[i]];
    }
    return order;
}
function updatenav(){
let x=document.querySelector('.music_play');
x.getElementsByTagName('img')[0].src=order[currentsong-1].songImage;
x.getElementsByClassName('title')[0].innerText=order[currentsong-1].songName;
x.getElementsByClassName('desc3')[0].innerText=order[currentsong-1].songDesc;
}

document.getElementById('volume_down').addEventListener('input',(e)=>{
    audio.volume=e.target.value/100;
    e.target.style.background=`linear-gradient(to right, white ${e.target.value}%, #333 ${e.target.value}%)`;


})
document.querySelector('.display1').addEventListener('click',()=>{
    let z1=document.querySelector('.main_right')
    z1.style.left='0';
})
document.querySelector('.cross').addEventListener('click',()=>{
    let z1=document.querySelector('.main_right')
    z1.style.left='-100%';
})
// Sidebar toggle functionality
document.querySelector('.display1').addEventListener('click', () => {
    let sidebar = document.querySelector('.main_right');
    sidebar.style.left = '0';
});

document.querySelector('.cross').addEventListener('click', () => {
    let sidebar = document.querySelector('.main_right');
    sidebar.style.left = '-100%';
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.main_right');
        const toggleBtn = document.querySelector('.display1');
        const crossBtn = document.querySelector('.cross');
        
        if (sidebar.style.left === '0px' && 
            !sidebar.contains(e.target) && 
            e.target !== toggleBtn && 
            !toggleBtn.contains(e.target) &&
            e.target !== crossBtn && 
            !crossBtn.contains(e.target)) {
            sidebar.style.left = '-100%';
        }
    }
});

// Close sidebar on window resize
window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.main_right');
    if (window.innerWidth > 768) {
        sidebar.style.left = '';
    } else if (window.innerWidth <= 768 && sidebar.style.left !== '0px') {
        sidebar.style.left = '-100%';
    }
});

// Initialize sidebar position based on screen size
window.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.main_right');
    if (window.innerWidth <= 768) {
        sidebar.style.left = '-100%';
    }
});