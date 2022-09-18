<script lang="ts">
    import type { Tracks } from "./assets/models";
    import logo from './assets/music_note.svg';

    const requestUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=blaxkr&api_key=dbb1697f637c3c4f0af4fc7a4e4628f3&format=json';
    const medias = [
        {name: 'github', link: 'https://github.com/bxkr'},
        {name: 'telegram', link: 'https://t.me/qikel'},
        {name: 'lastfm', link: 'https://last.fm/user/blaxkr'},
        {name: 'vk', link: 'https://vk.com/qikel'},
        {name: 'ph', link: 'https://vk.com/aedmd'}
    ];
    let trackName: string = "";
    let artistName: string = "";
    let label: string = "hope here will be track name";

    function nowPlaying(): void {
        fetch(requestUrl, {headers: {'Content-Encoding': 'br',}}).then((response) => {
            response.json().then((jsonResponse: Tracks) => {
                const zeroTrack = jsonResponse.recenttracks.track[0]
                trackName = zeroTrack.name;
                artistName = zeroTrack.artist["#text"];
                (<HTMLImageElement>document.querySelector('#logo')).src = zeroTrack.image[zeroTrack.image.length - 1]["#text"]
                if (zeroTrack["@attr"]) {
                    label = "(now)";
                } else {
                    const currentDate = new Date();
                    const date = new Date(
                        currentDate.getTime() + currentDate.getTimezoneOffset() * 60 -
                        Number(zeroTrack["date"]["uts"]) * 1000
                    );
                    const minutes = Math.floor(date.getTime() / 1000 / 60);
                    let ago = 0;
                    let ago_word: string;
                    if (minutes < 60) {
                        ago = minutes;
                        ago_word = 'minutes';
                    } else if (minutes >= 60 && minutes < 1440) {
                        ago = Math.floor(minutes / 60);
                        ago_word = 'hours';
                    } else if (minutes >= 1440) {
                        ago = Math.floor(minutes / 1440)
                        ago_word = 'days'
                    }
                    // plural check
                    if (ago.toString().slice(-1) == '1' && ago.toString().slice(-2) != '11') {
                        ago_word = ago_word.slice(0, -1)
                    }
                    label = `(${ago} ${ago_word} ago)`;
                }
            });
        });
    }

    function getLang(): string {
        if (navigator.languages != undefined)
            return navigator.languages[0];
        return navigator.language;
    }

    console.log(getLang());

    const toPage = (link: string) => {
        window.location.href = link;
    }

    setInterval(() => nowPlaying(), 5000)
</script>

<header on:click={() => toPage("https://last.fm/user/blaxkr")}>
    <div id="hello" use:nowPlaying>
        <img id="logo" alt="album logo" src={logo}>
        <div class="trackName">
            <p>{trackName}
            <p class="gray artist">{artistName} <span class="grayer trackLabel">{label}</span></p>
        </div>
    </div>
</header>

<main></main>
<div id="title"><b style="font-size: 2em">bxkr</b>
    {#each medias as media}
        &nbsp- <span class="link" on:click={() => toPage(media.link)}>{media.name}</span>
    {/each}
</div>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

  $header-text-margin: 24px;
  $header-logo-margin: 8px;
  $header-height: calc($header-text-margin + 1em + $header-text-margin);

  :root {
    font-family: 'Ubuntu', sans-serif;
    color: white;
    background-color: black;
    user-select: none;
  }

  main {
    border-radius: 5px 5px 0 0;
    background-image: url("assets/background.webp");
    background-size: cover;
    background-position: center;
    width: 100%;
    height: calc(100% - $header-height);
    position: absolute;
  }

  #title {
    position: absolute;
    top: 100%;
    transform: translateY(-100%);
  }

  .link {
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }

  .gray {
    color: gray;
  }

  .grayer {
    color: #333;
  }

  header {
    height: $header-height;
  }

  #logo {
    width: calc($header-height - $header-logo-margin * 2);
    height: calc($header-height - $header-logo-margin * 2);
    margin: $header-logo-margin;
    border-radius: 5px;
    background: #222;
  }

  #hello {
    height: $header-height;
    display: flex;
    flex-direction: row;
    z-index: 500;
    text-align: start;
    width: 100vw;
    align-items: center;
  }

  #hello > p {
    text-align: start;
    margin: 0;
  }

  .artist {
    font-size: small;
  }

  .trackName {
    flex-direction: column;
    height: 2em;
  }

  .trackName > p {
    margin: 0;
  }

  .trackLabel {
    visibility: hidden;
  }

  .trackName:hover {
    .trackLabel {
      visibility: visible;
    }
  }
</style>
