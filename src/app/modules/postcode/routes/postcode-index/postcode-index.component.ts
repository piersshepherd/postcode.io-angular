import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostcodeLocation } from '../../interfaces/postcode.interface';
import { PostcodeService } from '../../services/postcode.service';

@Component({
  selector: 'app-postcode-index',
  templateUrl: './postcode-index.component.html',
  styleUrls: ['./postcode-index.component.scss'],
})
export class PostcodeIndexComponent implements OnInit, OnDestroy {
  location: PostcodeLocation;
  nearestLocations: PostcodeLocation[];

  error = false;

  private postcodeSubscription: Subscription;
  private postcodeNearestSubscription: Subscription;

  constructor(
    private postcodeService: PostcodeService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe from any existing subscriptions.
    this.unsubscribeFromSubscriptions();
  }

  /**
   * React to postcode search form submissions.
   *
   * @note We could improve this with rate limiting and storing previously
   *   requested postcodes to avoid repeat requests.
   */
  onFormSubmission(postcode: string) {
    this.restart();

    // Get postcode location data.
    this.postcodeService.getPostcode(postcode).subscribe(
      location => this.location = location,
      error => this.error = true
    );
  }

  /**
   * React to trigger to get nearest.
   */
  onNearest(postcode: string) {
    this.unsubscribeFromSubscriptions();
    this.postcodeNearestSubscription = this.postcodeService.getNearestPostcodes(postcode).subscribe(
      nearest => {
        this.nearestLocations = nearest;
      }
    )
  }

  /**
   * Restart the user journey.
   */
  restart() {
    // Unset the error.
    this.error = false;

    this.location = null;
    this.nearestLocations = null;

    // Unsubscribe from any existing subscriptions.
    this.unsubscribeFromSubscriptions();
  }

  /**
   * When called, unsubscribes from the postcode subscriptio.
   */
  private unsubscribeFromSubscriptions() {
    if (this.postcodeSubscription) {
      this.postcodeSubscription.unsubscribe();
    }
    if (this.postcodeNearestSubscription) {
      this.postcodeNearestSubscription.unsubscribe();
    }
  }

}
