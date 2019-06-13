import { SpinnerService } from './../../../services/spinner.service';
import { Component, OnInit } from '@angular/core';
import { domFaderAnimation } from 'src/app/shared/animations/dom-fader.animation';

@Component({
  selector: 'yt-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  animations: [domFaderAnimation]
})
export class PlayerComponent implements OnInit {
  videoId = 'XL4iZVCBgQk';

  player;
  playerState: number;
  videoDuration: number;
  videoCurrentTime = 0;

  muted = false;
  paused = false;
  levelBeforeMute: string;

  seekerValue: number;

  constructor(private spinnerService: SpinnerService) {}

  ngOnInit() {
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

      // shows spinner
      this.spinnerService.spinnerShow();
    };

    // sets duration to 0 if video is not loaded / synchronizes video duration with originial youtube duration
    isNaN(this.videoDuration)
      ? (this.videoDuration = 0)
      : (this.videoDuration = this.player.getDuration() - 1);

    // starts the timer counting and displaying video current time each second
    this.videoDurationCount();
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

    // toggles play/pause button when clicking on video itself
    if (event.data === 2 && this.paused === false) {
      this.paused = true;
    } else if (event.data === 1 && this.paused === true) {
      this.paused = false;
    }
  }

  // The API will call this function when the video player is ready
  onPlayerReady(event) {
    // synchronizes video duration with originial youtube duration
    this.videoDuration = this.player.getDuration() - 1;
    console.log(this.videoDuration);

    // hides spinner
    this.spinnerService.spinnerHide();
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
    this.videoCurrentTime = Math.round(this.player.getCurrentTime());
  }

  // timer counting and displaying current time of the video
  videoDurationCount() {
    setInterval(() => {
      this.videoCurrentTime = Math.round(this.player.getCurrentTime());
      console.log(this.videoCurrentTime);
    }, 500);
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

  secondsFormater(value: number): string {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;

    let formatedDuration: string;

    if (seconds < 10) {
      formatedDuration = minutes + ':' + '0' + seconds;
    } else {
      formatedDuration = minutes + ':' + seconds;
    }

    return formatedDuration;
  }
}
