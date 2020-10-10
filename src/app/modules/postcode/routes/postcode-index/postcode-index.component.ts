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

  error = false;

  private postcodeSubscription: Subscription;

  constructor(
    private postcodeService: PostcodeService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe from any existing subscriptions.
    this.unsubscribeFromSubscription();
  }

  /**
   * React to postcode search form submissions.
   *
   * @note We could improve this with rate limiting.
   */
  onFormSubmission(postcode: string) {
    // Unset the error.
    this.error = false;

    // Unsubscribe from any existing subscriptions.
    this.unsubscribeFromSubscription();

    // Get postcode location data.
    this.postcodeService.getPostcode(postcode).subscribe(
      location => {
        console.log(location);
        this.location = location;
      },
      error => this.error = true
    );
  }

  /**
   * When called, unsubscribes from the postcode subscriptio.
   */
  private unsubscribeFromSubscription() {
    if (this.postcodeSubscription) {
      this.postcodeSubscription.unsubscribe();
    }
  }

}
