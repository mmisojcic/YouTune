import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'yt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  url = 'https://www.youtube.com/embed/uCIgxYuNGu0?enablejsapi=1';
  safeUrl: SafeResourceUrl;

  videoId = 'rqYE9kYYtkQ';

  player;
  playerState: number;
  videoDuration: number;
  videoCurrentTime = 0;

  muted = false;
  paused = false;
  levelBeforeMute: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    // this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);

    // Loads the YouTube API script
    this.loadYouTubeAPI();

    // creates object that represents the player
    (<any>window).onYouTubeIframeAPIReady = () => {
      this.player = new (<any>window).YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: this.videoId,
        events: {
          onReady: event => {
            this.onPlayerReady(event);
          },
          onStateChange: event => {
            this.onPlayerStateChange(event);
          }
        },
        playerVars: {
          autoplay: 0,
          controls: 0,
          modestbranding: 0,
          // playlist: 'UG3sfZKtCQI,ALZHF5UqnU4,x9ZkC3OgI78',
          showInfo: 0
        }
      });
    };
  }

  // Loads the YouTube API script
  loadYouTubeAPI() {
    const doc = (<any>window).document;
    const playerApiScript = doc.createElement('script');
    playerApiScript.type = 'text/javascript';
    playerApiScript.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApiScript);
  }

  // The API calls this function when the player's state changes.
  onPlayerStateChange(event) {
    console.log('onPlayerStateChange');
    console.log(event.data);
    this.playerState = event.data;
  }

  // The API will call this function when the video player is ready
  onPlayerReady(event) {
    console.log(event);
    this.videoDuration = this.player.getDuration();
    console.log(this.videoDuration);
    this.videoDurationCount();
    // event.target.cueVideoById({
    //   videoId: this.videoId
    // });
    // event.target.playVideo();
  }

  playToggle() {
    // this.player.loadVideoById(this.videoId);
    if (this.playerState === 1) {
      this.player.pauseVideo();
      this.paused = true;
    } else if (this.playerState === 2) {
      this.player.playVideo();
      this.paused = false;
    }
  }

  // fast forwards to the time givin by slider
  seek(slider: HTMLInputElement) {
    this.player.seekTo(slider.value, true);
  }

  videoDurationCount() {
    setInterval(() => {
      this.videoCurrentTime = Math.round(this.player.getCurrentTime());
      console.log(this.videoCurrentTime);
    }, 1000);
  }

  // regulate volume with slider
  volume(slider: HTMLInputElement) {
    if (this.player.isMuted()) {
      // unmute if muted
      this.player.unMute();
      this.muted = false;
    }
    this.player.setVolume(slider.value);
  }

  mute(slider: HTMLInputElement) {
    if (this.player.isMuted()) {
      // unmute if muted
      this.player.unMute();
      // set slider value to the value before muting
      slider.value = this.levelBeforeMute;
      this.muted = false;
      // mute if unmuted
    } else {
      // save slider value before muting
      this.levelBeforeMute = slider.value;
      this.player.mute();
      slider.value = '0';
      this.muted = true;
    }
  }
}
