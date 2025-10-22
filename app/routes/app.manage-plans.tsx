export default function PricingPage() {
  const plans = [
    {
      id: "free",
      name: "Free Plan",
      description: "Basic features to get started with loyalty points",
      price: 0,
      billing_cycle: "monthly",
      features: [
        "Earn points on birthdays",
        "View points dashboard",
        "Limited rewards redemption"
      ],
      limits: {
        max_users: 1,
        max_points_per_user: 1000
      }
    },
    {
      id: "starter",
      name: "Starter Plan",
      description: "Advanced features for small shops",
      price: 49,
      billing_cycle: "monthly",
      features: [
        "Earn points on social media actions",
        "Unlimited points tracking",
        "Full rewards redemption options",
        "Create discount codes"
      ],
      limits: {
        max_users: 5,
        max_points_per_user: 5000
      },
      recommended: true
    },
    {
      id: "pro",
      name: "Pro Plan",
      description: "Full-featured plan for growing businesses",
      price: 149,
      billing_cycle: "monthly",
      features: [
        "All Starter Plan features",
        "Advanced analytics",
        "Priority support",
        "Custom reward rules"
      ],
      limits: {
        max_users: 50,
        max_points_per_user: 50000
      }
    }
  ];

  const subscriptions = [
    {
      id: "sub_001",
      plan_id: "starter",
      user_id: "user_123",
      status: "active",
      start_date: "2025-10-16",
      end_date: "2025-11-16",
      billing_history: [
        {
          invoice_id: "inv_001",
          amount: 49,
          date: "2025-10-16",
          status: "paid"
        }
      ]
    },
    {
      id: "sub_002",
      plan_id: "pro",
      user_id: "user_456",
      status: "trial",
      start_date: "2025-10-10",
      end_date: "2025-10-24",
      billing_history: []
    }
  ];

  const currentSubscription = subscriptions[0]; // Example: showing first subscription as current

  return (
    <s-page heading="Manage Plans">
      {/* Introduction */}
      <s-section heading="Choose Your Plan">
        <s-paragraph>
          Select the perfect plan for your business. All plans include core loyalty
          features to help you engage customers and boost retention. Upgrade or downgrade
          anytime without losing your data.
        </s-paragraph>
      </s-section>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <s-section heading="Current Subscription">
          <s-paragraph>
            <strong>Plan:</strong> {plans.find(p => p.id === currentSubscription.plan_id)?.name}
          </s-paragraph>
          <s-paragraph>
            <strong>Status:</strong> {currentSubscription.status === "active" ? "✅ Active" : "🔄 Trial"}
          </s-paragraph>
          <s-paragraph>
            <strong>Billing Period:</strong> {currentSubscription.start_date} to {currentSubscription.end_date}
          </s-paragraph>
          {currentSubscription.billing_history.length > 0 && (
            <s-paragraph>
              <strong>Last Payment:</strong> ₹{currentSubscription.billing_history[0].amount} on {currentSubscription.billing_history[0].date} ({currentSubscription.billing_history[0].status})
            </s-paragraph>
          )}
        </s-section>
      )}

      {/* Free Plan */}
      <s-section heading="🆓 Free Plan - ₹0/month">
        <s-paragraph>
          <strong>{plans[0].description}</strong>
        </s-paragraph>

        <s-paragraph>
          <strong>Features:</strong>
        </s-paragraph>
        <s-unordered-list>
          {plans[0].features.map((feature, index) => (
            <s-list-item key={index}>✓ {feature}</s-list-item>
          ))}
        </s-unordered-list>

        <s-paragraph>
          <strong>Limits:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Maximum {plans[0].limits.max_users} user(s)</s-list-item>
          <s-list-item>Up to {plans[0].limits.max_points_per_user.toLocaleString()} points per user</s-list-item>
        </s-unordered-list>

        <s-button variant="secondary">Get Started Free</s-button>
      </s-section>

      {/* Starter Plan */}
      <s-section heading="🚀 Starter Plan - ₹49/month (Recommended)">
        <s-paragraph>
          <strong>{plans[1].description}</strong>
        </s-paragraph>

        <s-paragraph>
          <strong>Features:</strong>
        </s-paragraph>
        <s-unordered-list>
          {plans[1].features.map((feature, index) => (
            <s-list-item key={index}>✓ {feature}</s-list-item>
          ))}
        </s-unordered-list>

        <s-paragraph>
          <strong>Limits:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Maximum {plans[1].limits.max_users} users</s-list-item>
          <s-list-item>Up to {plans[1].limits.max_points_per_user.toLocaleString()} points per user</s-list-item>
        </s-unordered-list>

        <s-button variant="primary">Upgrade to Starter</s-button>
      </s-section>

      {/* Pro Plan */}
      <s-section heading="💎 Pro Plan - ₹149/month">
        <s-paragraph>
          <strong>{plans[2].description}</strong>
        </s-paragraph>

        <s-paragraph>
          <strong>Features:</strong>
        </s-paragraph>
        <s-unordered-list>
          {plans[2].features.map((feature, index) => (
            <s-list-item key={index}>✓ {feature}</s-list-item>
          ))}
        </s-unordered-list>

        <s-paragraph>
          <strong>Limits:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>Maximum {plans[2].limits.max_users} users</s-list-item>
          <s-list-item>Up to {plans[2].limits.max_points_per_user.toLocaleString()} points per user</s-list-item>
        </s-unordered-list>

        <s-button variant="primary">Upgrade to Pro</s-button>
      </s-section>

      {/* Billing History */}
      <s-section heading="Billing History">
        {currentSubscription && currentSubscription.billing_history.length > 0 ? (
          <>
            <s-paragraph>
              <strong>Recent Transactions:</strong>
            </s-paragraph>
            {currentSubscription.billing_history.map((invoice, index) => (
              <s-paragraph key={index}>
                📄 Invoice #{invoice.invoice_id} - ₹{invoice.amount} on {invoice.date} -
                {invoice.status === "paid" ? " ✅ Paid" : " ⏳ Pending"}
              </s-paragraph>
            ))}
          </>
        ) : (
          <s-paragraph>
            No billing history available. {currentSubscription?.status === "trial" && "You are currently on a trial period."}
          </s-paragraph>
        )}
      </s-section>

      {/* Sidebar - Plan Comparison */}
      <s-section slot="aside" heading="Plan Comparison">
        <s-paragraph>
          <strong>Free Plan:</strong> Perfect for testing and individual use
        </s-paragraph>
        <s-paragraph>
          <strong>Starter Plan:</strong> Ideal for small businesses and growing shops
        </s-paragraph>
        <s-paragraph>
          <strong>Pro Plan:</strong> Best for established businesses with high volume
        </s-paragraph>
      </s-section>

      {/* Sidebar - FAQs */}
      <s-section slot="aside" heading="Pricing FAQs">
        <s-paragraph>
          <strong>Can I change plans?</strong>
        </s-paragraph>
        <s-paragraph>
          Yes! You can upgrade or downgrade anytime. Changes take effect immediately.
        </s-paragraph>

        <s-paragraph>
          <strong>What happens to my data?</strong>
        </s-paragraph>
        <s-paragraph>
          All your data is preserved when changing plans. You'll never lose customer points or history.
        </s-paragraph>

        <s-paragraph>
          <strong>Is there a free trial?</strong>
        </s-paragraph>
        <s-paragraph>
          Yes! All paid plans include a 14-day free trial. No credit card required.
        </s-paragraph>
      </s-section>

      {/* Sidebar - Support */}
      <s-section slot="aside" heading="Need Help?">
        <s-paragraph>
          Have questions about pricing or plans?
        </s-paragraph>
        <s-paragraph>
          <s-link href="/app/support">Contact Support</s-link>
        </s-paragraph>
        <s-paragraph>
          <s-link href="mailto:billing@loyaltypoints.app" target="_blank">
            Email: billing@loyaltypoints.app
          </s-link>
        </s-paragraph>
      </s-section>
    </s-page>
  );
}
