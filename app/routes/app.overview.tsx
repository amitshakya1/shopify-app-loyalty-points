export default function OverviewPage() {
  const stats = {
    totalCustomers: 4,
    totalPoints: 5000,
    totalOrders: 53,
    activeDiscounts: 5,
    pointsRedeemed: 625,
    revenue: 15245
  };

  const recentActivities = [
    { date: "2025-10-14", customer: "Priya Sharma", action: "Earned 100 points", type: "Birthday Reward" },
    { date: "2025-10-12", customer: "Rahul Kumar", action: "Earned 300 points", type: "Purchase Order #ORD345" },
    { date: "2025-10-10", customer: "Jane Smith", action: "Earned 50 points", type: "YouTube Subscribe" },
    { date: "2025-10-08", customer: "Rahul Kumar", action: "Earned 50 points", type: "LinkedIn Follow" },
    { date: "2025-10-05", customer: "John Doe", action: "Earned 50 points", type: "Facebook Follow" }
  ];

  return (
    <s-page heading="Overview Dashboard">
      {/* Welcome Section */}
      <s-section heading="Welcome to Loyalty Points App">
        <s-paragraph>
          Track your loyalty program performance, manage customer rewards, and monitor key metrics
          all in one place. Get insights into customer engagement and points distribution.
        </s-paragraph>
      </s-section>

      {/* Key Metrics - Box Layout */}
      <s-section heading="Key Metrics">
        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 1 - Total Customers */}
        <s-paragraph>
          <strong>📊 Total Customers</strong>
        </s-paragraph>
        <s-paragraph>
          👥 {stats.totalCustomers} Active Members
        </s-paragraph>
        <s-paragraph>
          Registered users in your loyalty program
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 2 - Total Points */}
        <s-paragraph>
          <strong>💎 Total Points Distributed</strong>
        </s-paragraph>
        <s-paragraph>
          {stats.totalPoints.toLocaleString()} Points
        </s-paragraph>
        <s-paragraph>
          Loyalty points across all customers
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 3 - Total Orders */}
        <s-paragraph>
          <strong>🛒 Total Orders</strong>
        </s-paragraph>
        <s-paragraph>
          {stats.totalOrders} Orders
        </s-paragraph>
        <s-paragraph>
          Combined orders from loyalty members
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 4 - Points Redeemed */}
        <s-paragraph>
          <strong>🎟️ Points Redeemed</strong>
        </s-paragraph>
        <s-paragraph>
          {stats.pointsRedeemed.toLocaleString()} Points
        </s-paragraph>
        <s-paragraph>
          Total points converted to discounts
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 5 - Total Revenue */}
        <s-paragraph>
          <strong>💰 Total Revenue</strong>
        </s-paragraph>
        <s-paragraph>
          ₹{stats.revenue.toLocaleString()}
        </s-paragraph>
        <s-paragraph>
          Revenue from loyalty program members
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Box 6 - Active Discounts */}
        <s-paragraph>
          <strong>🏷️ Active Discount Codes</strong>
        </s-paragraph>
        <s-paragraph>
          {stats.activeDiscounts} Codes
        </s-paragraph>
        <s-paragraph>
          Currently active discount codes
        </s-paragraph>

        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>
      </s-section>

      {/* Recent Activity */}
      <s-section heading="Recent Activity">
        <s-paragraph>
          <strong>Latest customer activities:</strong>
        </s-paragraph>
        {recentActivities.map((activity, index) => (
          <s-paragraph key={index}>
            📅 <strong>{activity.date}</strong> - {activity.customer} - {activity.action} ({activity.type})
          </s-paragraph>
        ))}
        <s-paragraph>
          <s-link href="/app/customers">
            <s-button variant="secondary">View All Customers →</s-button>
          </s-link>
        </s-paragraph>
      </s-section>

      {/* Quick Actions */}
      <s-section heading="Quick Actions">
        <s-paragraph>
          <strong>Manage your loyalty program:</strong>
        </s-paragraph>
        <s-paragraph>
          <s-link href="/app/customers">
            <s-button variant="primary">View Customers</s-button>
          </s-link>
          {" "}
          <s-link href="/app/plans">
            <s-button variant="secondary">Manage Plans</s-button>
          </s-link>
          {" "}
          <s-link href="/app/sales">
            <s-button variant="secondary">View Analytics</s-button>
          </s-link>
          {" "}
          <s-link href="/app/support">
            <s-button>Get Support</s-button>
          </s-link>
        </s-paragraph>
      </s-section>

      {/* Program Status */}
      <s-section heading="Program Status">
        <s-paragraph>
          <strong>System Health:</strong> ✅ All Systems Operational
        </s-paragraph>
        <s-paragraph>
          <strong>Last Sync:</strong> October 16, 2025 at 10:30 AM
        </s-paragraph>
        <s-paragraph>
          <strong>Active Plan:</strong> Starter Plan (₹49/month)
        </s-paragraph>
        <s-paragraph>
          <strong>Redemption Rate:</strong> {((stats.pointsRedeemed / stats.totalPoints) * 100).toFixed(1)}%
        </s-paragraph>
      </s-section>

      {/* Sidebar - Quick Stats */}
      <s-section slot="aside" heading="Quick Stats">
        <s-paragraph>
          <strong>Avg Points per Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          {Math.round(stats.totalPoints / stats.totalCustomers).toLocaleString()} points
        </s-paragraph>

        <s-paragraph>
          <strong>Avg Orders per Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          {Math.round(stats.totalOrders / stats.totalCustomers)} orders
        </s-paragraph>

        <s-paragraph>
          <strong>Avg Revenue per Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          ₹{Math.round(stats.revenue / stats.totalCustomers).toLocaleString()}
        </s-paragraph>
      </s-section>

      {/* Sidebar - Top Performers */}
      <s-section slot="aside" heading="Top Performers">
        <s-paragraph>
          <strong>🥇 Top Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          Rahul Kumar (2,500 points)
        </s-paragraph>

        <s-paragraph>
          <strong>🔥 Most Active:</strong>
        </s-paragraph>
        <s-paragraph>
          Rahul Kumar (25 orders)
        </s-paragraph>

        <s-paragraph>
          <strong>🆕 Newest Member:</strong>
        </s-paragraph>
        <s-paragraph>
          Priya Sharma (Joined Sep 2024)
        </s-paragraph>
      </s-section>

      {/* Sidebar - Getting Started */}
      <s-section slot="aside" heading="Getting Started">
        <s-paragraph>
          <strong>Setup Your Program:</strong>
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>✅ Configure reward rules</s-list-item>
          <s-list-item>✅ Set point values</s-list-item>
          <s-list-item>✅ Customize emails</s-list-item>
          <s-list-item>⏳ Add more customers</s-list-item>
        </s-unordered-list>
      </s-section>

      {/* Sidebar - Resources */}
      <s-section slot="aside" heading="Resources">
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app/support">
              Support Center
            </s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://shopify.dev/docs/apps" target="_blank">
              Shopify Documentation
            </s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://docs.loyaltypoints.app" target="_blank">
              User Guide
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}
