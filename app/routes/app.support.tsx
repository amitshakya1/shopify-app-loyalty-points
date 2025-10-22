export default function SupportPage() {
  return (
    <s-page heading="Support & Help">
      {/* Overview Section */}
      <s-section heading="App Overview">
        <s-paragraph>
          Welcome to the Loyalty Points App support page! Here you'll find
          resources and instructions to help you get the most out of your app.
          The app helps users earn points, redeem rewards, manage profiles, and
          create discount codes seamlessly.
        </s-paragraph>
      </s-section>

      {/* Quick Start Guide */}
      <s-section heading="Getting Started">
        <s-paragraph>
          <strong>For Users:</strong> Login with your phone number to access your rewards dashboard,
          track points, and generate discount codes for your purchases.
        </s-paragraph>
        <s-paragraph>
          <strong>For Admins:</strong> Navigate through the app sections to manage customers,
          view sales analytics, and configure your loyalty program plans.
        </s-paragraph>
      </s-section>

      {/* FAQs Section */}
      <s-section heading="Frequently Asked Questions">
        <s-paragraph>
          <strong>How do users earn points?</strong>
        </s-paragraph>
        <s-paragraph>
          Users earn points through birthday rewards, social media actions (YouTube, Instagram,
          Facebook, LinkedIn), and other promotional activities configured in your loyalty program.
        </s-paragraph>

        <s-paragraph>
          <strong>How can points be redeemed?</strong>
        </s-paragraph>
        <s-paragraph>
          Points can be converted into discount codes with a 1:1 ratio (1 Reward Point = ₹1).
          Please note: Minimum cart value is ₹500, and maximum discount is ₹200 per order.
        </s-paragraph>

        <s-paragraph>
          <strong>How does phone login work?</strong>
        </s-paragraph>
        <s-paragraph>
          Users enter their phone number, receive a 4-digit OTP via SMS, and verify it to access
          their personalized rewards dashboard.
        </s-paragraph>

        <s-paragraph>
          <strong>How to create discount codes?</strong>
        </s-paragraph>
        <s-paragraph>
          After logging in, users can enter their desired discount amount in the dashboard and
          generate discount codes instantly, as long as they have sufficient points.
        </s-paragraph>

        <s-paragraph>
          <strong>How to track rewards and points?</strong>
        </s-paragraph>
        <s-paragraph>
          The dashboard displays available points balance, complete reward history, and all
          generated discount codes with their expiration dates.
        </s-paragraph>
      </s-section>

      {/* Troubleshooting Tips */}
      <s-section heading="Troubleshooting & Common Issues">
        <s-paragraph>
          <strong>OTP not received:</strong> Ensure the phone number is entered correctly
          and check your network connectivity. If issues persist, try again after a few minutes.
        </s-paragraph>
        <s-paragraph>
          <strong>Discount code not generated:</strong> Verify that your cart value meets
          the minimum requirement of ₹500 and you have sufficient points for the discount amount.
        </s-paragraph>
        <s-paragraph>
          <strong>Points not updated:</strong> Ensure all required actions (social follows,
          birthday registration) are completed properly. Points may take a few minutes to reflect.
        </s-paragraph>
        <s-paragraph>
          <strong>Need more help?</strong> Contact our support team at{" "}
          <s-link href="mailto:support@loyaltypoints.app" target="_blank">
            support@loyaltypoints.app
          </s-link>{" "}
          or use the live chat feature in your admin dashboard.
        </s-paragraph>
      </s-section>

      {/* Submit Support Ticket */}


      {/* Contact Support */}


      {/* Resources Sidebar */}
      {/* <s-section slot="aside" heading="Quick Navigation">
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app">Dashboard Home</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="/app/overview">Overview</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="/app/customers">Manage Customers</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="/app/sales">View Sales Analytics</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="/app/plans">Configure Plans</s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section> */}



      <s-section slot="aside" heading="Submit a Support Ticket">
        <s-paragraph>
          Still having issues? Fill out the form below to create a support ticket.
          Our team will get back to you within 24 hours.
        </s-paragraph>

        <s-text-field
          name="name"
          label="Your Name"
          required
        ></s-text-field>

        <s-text-field
          name="email"
          label="Email Address"
          details="your.email@example.com"
          required
        ></s-text-field>

        <s-text-field
          name="subject"
          label="Subject"
          details="Brief description of your issue"
          required
        ></s-text-field>

        <s-select
          name="category"
          label="Issue Category"
          required
        >
          <option value="">Select a category</option>
          <option value="login">Login Issues</option>
          <option value="points">Points Not Updating</option>
          <option value="discount">Discount Code Problems</option>
          <option value="otp">OTP Issues</option>
          <option value="account">Account Management</option>
          <option value="technical">Technical Issues</option>
          <option value="other">Other</option>
        </s-select>

        <s-text-field
          name="message"
          label="Describe Your Issue"
          details="Please provide as much detail as possible"
          required
        ></s-text-field>

        <s-button variant="primary">Submit Ticket</s-button>
      </s-section>

      <s-section slot="aside" heading="Other Ways to Reach Us">
        <s-paragraph>
          <strong>📧 Email Support:</strong> Get help from our support team via email at{" "}
          <s-link href="mailto:support@loyaltypoints.app" target="_blank">
            support@loyaltypoints.app
          </s-link>
          . We typically respond within 24 hours.
        </s-paragraph>
        <s-paragraph>
          <strong>💬 Live Chat:</strong> For immediate assistance, use the live chat feature
          available in your dashboard during business hours (Monday-Friday, 9 AM - 6 PM IST).
        </s-paragraph>
        <s-paragraph>
          <strong>📚 Documentation:</strong> Visit our{" "}
          <s-link href="https://docs.loyaltypoints.app" target="_blank">
            comprehensive documentation
          </s-link>{" "}
          for detailed guides and tutorials.
        </s-paragraph>
      </s-section>

      {/* <s-section slot="aside" heading="Support Status">
        <s-paragraph>
          <s-text>🟢 All Systems Operational</s-text>
        </s-paragraph>
        <s-paragraph>
          <s-link href="https://status.loyaltypoints.app" target="_blank">
            View Status Page
          </s-link>
        </s-paragraph>
      </s-section> */}
    </s-page>
  );
}
