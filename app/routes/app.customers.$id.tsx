import { useParams, useNavigate } from "react-router";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // This would typically come from a database or API
  const customers = [
    {
      id: "cust_001",
      name: "John Doe",
      phone: "+911234567890",
      email: "john@example.com",
      total_points: 1200,
      total_orders: 15,
      joined_date: "2024-05-15",
      last_activity: "2025-10-05",
      points_history: [
        { date: "2025-10-01", points: 100, activity: "Birthday Reward", type: "earned" },
        { date: "2025-10-05", points: 50, activity: "Facebook Follow", type: "earned" },
        { date: "2025-09-15", points: 200, activity: "Purchase Order #ORD123", type: "earned" },
        { date: "2025-09-10", points: 100, activity: "Instagram Follow", type: "earned" },
        { date: "2025-08-20", points: -150, activity: "Redeemed for discount code", type: "redeemed" }
      ],
      orders: [
        { order_id: "ORD123", date: "2025-09-20", amount: 499, status: "Completed", items: 3 },
        { order_id: "ORD122", date: "2025-09-15", amount: 899, status: "Completed", items: 5 },
        { order_id: "ORD121", date: "2025-09-01", amount: 1299, status: "Completed", items: 7 }
      ],
      discount_codes: [
        { code: "REWARD100", amount: 100, status: "Used", used_date: "2025-09-20" },
        { code: "REWARD50", amount: 50, status: "Active", expires: "2025-11-20" }
      ]
    },
    {
      id: "cust_002",
      name: "Jane Smith",
      phone: "+919876543210",
      email: "jane.smith@example.com",
      total_points: 850,
      total_orders: 8,
      joined_date: "2024-07-20",
      last_activity: "2025-10-10",
      points_history: [
        { date: "2025-10-10", points: 50, activity: "YouTube Subscribe", type: "earned" },
        { date: "2025-10-08", points: 100, activity: "Birthday Reward", type: "earned" },
        { date: "2025-09-25", points: 150, activity: "Purchase Order #ORD234", type: "earned" }
      ],
      orders: [
        { order_id: "ORD234", date: "2025-09-25", amount: 799, status: "Completed", items: 4 },
        { order_id: "ORD233", date: "2025-09-18", amount: 599, status: "Completed", items: 2 }
      ],
      discount_codes: [
        { code: "REWARD75", amount: 75, status: "Active", expires: "2025-12-10" }
      ]
    },
    {
      id: "cust_003",
      name: "Rahul Kumar",
      phone: "+919123456789",
      email: "rahul.k@example.com",
      total_points: 2500,
      total_orders: 25,
      joined_date: "2024-01-10",
      last_activity: "2025-10-12",
      points_history: [
        { date: "2025-10-12", points: 300, activity: "Purchase Order #ORD345", type: "earned" },
        { date: "2025-10-08", points: 50, activity: "LinkedIn Follow", type: "earned" },
        { date: "2025-10-01", points: 100, activity: "Birthday Reward", type: "earned" },
        { date: "2025-09-20", points: -200, activity: "Redeemed for discount", type: "redeemed" }
      ],
      orders: [
        { order_id: "ORD345", date: "2025-10-12", amount: 1599, status: "Completed", items: 8 },
        { order_id: "ORD344", date: "2025-10-05", amount: 999, status: "Processing", items: 6 },
        { order_id: "ORD343", date: "2025-09-28", amount: 699, status: "Completed", items: 3 }
      ],
      discount_codes: [
        { code: "REWARD200", amount: 200, status: "Used", used_date: "2025-09-20" },
        { code: "REWARD150", amount: 150, status: "Active", expires: "2025-11-30" }
      ]
    },
    {
      id: "cust_004",
      name: "Priya Sharma",
      phone: "+919988776655",
      email: "priya.sharma@example.com",
      total_points: 450,
      total_orders: 5,
      joined_date: "2024-09-05",
      last_activity: "2025-10-14",
      points_history: [
        { date: "2025-10-14", points: 100, activity: "Birthday Reward", type: "earned" },
        { date: "2025-10-10", points: 50, activity: "Facebook Follow", type: "earned" },
        { date: "2025-10-05", points: 100, activity: "Purchase Order #ORD456", type: "earned" }
      ],
      orders: [
        { order_id: "ORD456", date: "2025-10-05", amount: 599, status: "Completed", items: 2 },
        { order_id: "ORD455", date: "2025-09-20", amount: 799, status: "Completed", items: 4 }
      ],
      discount_codes: []
    }
  ];

  const customer = customers.find(c => c.id === id);

  if (!customer) {
    return (
      <s-page heading="Customer Not Found">
        <s-section>
          <s-paragraph>
            The customer with ID "{id}" could not be found.
          </s-paragraph>
          <s-button variant="primary" onClick={() => navigate('/app/customers')}>
            ← Back to Customer List
          </s-button>
        </s-section>
      </s-page>
    );
  }

  const totalEarned = customer.points_history
    .filter(h => h.type === "earned")
    .reduce((sum, h) => sum + h.points, 0);

  const totalRedeemed = Math.abs(
    customer.points_history
      .filter(h => h.type === "redeemed")
      .reduce((sum, h) => sum + h.points, 0)
  );

  const totalOrderValue = customer.orders.reduce((sum, o) => sum + o.amount, 0);
  const avgOrderValue = customer.orders.length > 0 ? Math.round(totalOrderValue / customer.orders.length) : 0;

  return (
    <s-page heading={`Customer Details - ${customer.name}`}>
      {/* Back Button */}
      <s-section>
        <s-button variant="secondary" onClick={() => navigate('/app/customers')}>
          ← Back to Customer List
        </s-button>
      </s-section>

      {/* Customer Information */}
      <s-section heading="Customer Information">
        <s-paragraph>
          <strong>Customer ID:</strong> {customer.id}
        </s-paragraph>
        <s-paragraph>
          <strong>Name:</strong> {customer.name}
        </s-paragraph>
        <s-paragraph>
          <strong>Email:</strong> {customer.email}
        </s-paragraph>
        <s-paragraph>
          <strong>Phone:</strong> {customer.phone}
        </s-paragraph>
        <s-paragraph>
          <strong>Member Since:</strong> {customer.joined_date}
        </s-paragraph>
        <s-paragraph>
          <strong>Last Activity:</strong> {customer.last_activity}
        </s-paragraph>
      </s-section>

      {/* Points Summary */}
      <s-section heading="Points Summary">
        <s-paragraph>
          <strong>Current Balance:</strong> 💎 {customer.total_points.toLocaleString()} points
        </s-paragraph>
        <s-paragraph>
          <strong>Total Earned:</strong> +{totalEarned.toLocaleString()} points
        </s-paragraph>
        <s-paragraph>
          <strong>Total Redeemed:</strong> -{totalRedeemed.toLocaleString()} points
        </s-paragraph>
        <s-paragraph>
          <strong>Lifetime Value:</strong> {(totalEarned + totalRedeemed).toLocaleString()} points
        </s-paragraph>
      </s-section>

      {/* Points History */}
      <s-section heading="Points History">
        <s-paragraph>
          <strong>Recent activity:</strong>
        </s-paragraph>
        {customer.points_history.map((history, index) => (
          <s-paragraph key={index}>
            📅 <strong>{history.date}</strong> -{" "}
            {history.type === "earned" ? (
              <strong style={{ color: "green" }}>+{history.points} points</strong>
            ) : (
              <strong style={{ color: "red" }}>{history.points} points</strong>
            )}{" "}
            - {history.activity}
          </s-paragraph>
        ))}
      </s-section>

      {/* Order History */}
      <s-section heading="Order History">
        <s-paragraph>
          <strong>Total Orders:</strong> {customer.total_orders} |
          <strong> Total Value:</strong> ₹{totalOrderValue.toLocaleString()} |
          <strong> Average:</strong> ₹{avgOrderValue}
        </s-paragraph>

        {customer.orders.map((order) => (
          <s-paragraph key={order.order_id}>
            📦 <strong>Order #{order.order_id}</strong> |
            Date: {order.date} |
            Amount: ₹{order.amount} |
            Items: {order.items} |
            Status: {order.status === "Completed" ? "✅ Completed" : "⏳ Processing"}
          </s-paragraph>
        ))}
      </s-section>

      {/* Discount Codes */}
      <s-section heading="Discount Codes">
        {customer.discount_codes.length > 0 ? (
          <>
            <s-paragraph>
              <strong>Generated discount codes:</strong>
            </s-paragraph>
            {customer.discount_codes.map((code, index) => (
              <s-paragraph key={index}>
                🎟️ <strong>{code.code}</strong> |
                Amount: ₹{code.amount} |
                Status: {code.status === "Active" ? "✅ Active" : "✓ Used"} |
                {code.status === "Active" ? `Expires: ${code.expires}` : `Used: ${code.used_date}`}
              </s-paragraph>
            ))}
          </>
        ) : (
          <s-paragraph>No discount codes generated yet.</s-paragraph>
        )}
      </s-section>

      {/* Customer Actions */}
      <s-section heading="Manage Customer">
        <s-paragraph>
          <strong>Perform actions for this customer:</strong>
        </s-paragraph>
        <s-button variant="primary">Add Points</s-button>
        {" "}
        <s-button variant="secondary">Subtract Points</s-button>
        {" "}
        <s-button variant="secondary">Send Email</s-button>
        {" "}
        <s-button variant="secondary">Send SMS</s-button>
        {" "}
        <s-button>Export Data</s-button>
      </s-section>

      {/* Sidebar - Quick Stats */}
      <s-section slot="aside" heading="Quick Stats">
        <s-paragraph>
          <strong>Current Points:</strong>
        </s-paragraph>
        <s-paragraph>
          💎 {customer.total_points.toLocaleString()}
        </s-paragraph>

        <s-paragraph>
          <strong>Total Orders:</strong>
        </s-paragraph>
        <s-paragraph>
          🛒 {customer.total_orders}
        </s-paragraph>

        <s-paragraph>
          <strong>Total Spent:</strong>
        </s-paragraph>
        <s-paragraph>
          ₹{totalOrderValue.toLocaleString()}
        </s-paragraph>

        <s-paragraph>
          <strong>Avg Order Value:</strong>
        </s-paragraph>
        <s-paragraph>
          ₹{avgOrderValue}
        </s-paragraph>
      </s-section>

      {/* Sidebar - Customer Status */}
      <s-section slot="aside" heading="Customer Status">
        <s-paragraph>
          <strong>Account Status:</strong>
        </s-paragraph>
        <s-paragraph>
          ✅ Active
        </s-paragraph>

        <s-paragraph>
          <strong>Loyalty Tier:</strong>
        </s-paragraph>
        <s-paragraph>
          {customer.total_points >= 2000 ? "💎 Platinum" : customer.total_points >= 1000 ? "🥇 Gold" : customer.total_points >= 500 ? "🥈 Silver" : "🥉 Bronze"}
        </s-paragraph>

        <s-paragraph>
          <strong>Engagement Level:</strong>
        </s-paragraph>
        <s-paragraph>
          {customer.total_orders >= 20 ? "🔥 Highly Engaged" : customer.total_orders >= 10 ? "⚡ Regular" : "👍 Active"}
        </s-paragraph>
      </s-section>

      {/* Sidebar - Actions */}
      <s-section slot="aside" heading="Quick Actions">
        <s-paragraph>
          <s-button variant="primary">Add Bonus Points</s-button>
        </s-paragraph>
        <s-paragraph>
          <s-button variant="secondary">Generate Discount</s-button>
        </s-paragraph>
        <s-paragraph>
          <s-button variant="secondary">View All Orders</s-button>
        </s-paragraph>
        <s-paragraph>
          <s-button onClick={() => navigate('/app/customers')}>
            Back to List
          </s-button>
        </s-paragraph>
      </s-section>
    </s-page>
  );
}
