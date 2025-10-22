export default function CustomersPage() {
  const customers = [
    {
      id: "cust_001",
      name: "John Doe",
      phone: "+911234567890",
      email: "john@example.com",
      total_points: 1200,
      total_orders: 15,
      points_history: [
        { date: "2025-10-01", points: 100, activity: "Birthday Reward" },
        { date: "2025-10-05", points: 50, activity: "Facebook Follow" },
        { date: "2025-09-15", points: 200, activity: "Purchase Order #ORD123" },
        { date: "2025-09-10", points: 100, activity: "Instagram Follow" }
      ],
      orders: [
        { order_id: "ORD123", date: "2025-09-20", amount: 499, status: "Completed" },
        { order_id: "ORD122", date: "2025-09-15", amount: 899, status: "Completed" },
        { order_id: "ORD121", date: "2025-09-01", amount: 1299, status: "Completed" }
      ]
    },
    {
      id: "cust_002",
      name: "Jane Smith",
      phone: "+919876543210",
      email: "jane.smith@example.com",
      total_points: 850,
      total_orders: 8,
      points_history: [
        { date: "2025-10-10", points: 50, activity: "YouTube Subscribe" },
        { date: "2025-10-08", points: 100, activity: "Birthday Reward" },
        { date: "2025-09-25", points: 150, activity: "Purchase Order #ORD234" }
      ],
      orders: [
        { order_id: "ORD234", date: "2025-09-25", amount: 799, status: "Completed" },
        { order_id: "ORD233", date: "2025-09-18", amount: 599, status: "Completed" }
      ]
    },
    {
      id: "cust_003",
      name: "Rahul Kumar",
      phone: "+919123456789",
      email: "rahul.k@example.com",
      total_points: 2500,
      total_orders: 25,
      points_history: [
        { date: "2025-10-12", points: 300, activity: "Purchase Order #ORD345" },
        { date: "2025-10-08", points: 50, activity: "LinkedIn Follow" },
        { date: "2025-10-01", points: 100, activity: "Birthday Reward" }
      ],
      orders: [
        { order_id: "ORD345", date: "2025-10-12", amount: 1599, status: "Completed" },
        { order_id: "ORD344", date: "2025-10-05", amount: 999, status: "Processing" },
        { order_id: "ORD343", date: "2025-09-28", amount: 699, status: "Completed" }
      ]
    },
    {
      id: "cust_004",
      name: "Priya Sharma",
      phone: "+919988776655",
      email: "priya.sharma@example.com",
      total_points: 450,
      total_orders: 5,
      points_history: [
        { date: "2025-10-14", points: 100, activity: "Birthday Reward" },
        { date: "2025-10-10", points: 50, activity: "Facebook Follow" },
        { date: "2025-10-05", points: 100, activity: "Purchase Order #ORD456" }
      ],
      orders: [
        { order_id: "ORD456", date: "2025-10-05", amount: 599, status: "Completed" },
        { order_id: "ORD455", date: "2025-09-20", amount: 799, status: "Completed" }
      ]
    }
  ];

  return (
    <s-page heading="Customer Management">
      {/* Overview Stats */}

      <s-section heading="Overview">
        <s-paragraph>
          <strong>Total Customers:</strong> {customers.length} |
          <strong> Total Points Distributed:</strong> {customers.reduce((sum, c) => sum + c.total_points, 0).toLocaleString()} |
          <strong> Total Orders:</strong> {customers.reduce((sum, c) => sum + c.total_orders, 0)}
        </s-paragraph>
      </s-section>

      {/* Search & Filter */}
      <s-section heading="Search Customers">
        <s-text-field
          name="search"
          label="Search by name, phone, or email"
          details="Start typing to filter customers"
        ></s-text-field>
      </s-section>

      {/* Customer List Table */}
      <s-section heading="All Customers">
        <s-paragraph>
          <strong>Customer List - Click "View Details" to see full information</strong>
        </s-paragraph>

        {/* Table Header */}
        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>
        <s-paragraph>
          <strong>Name | Phone | Email | Total Points | Total Orders | Action</strong>
        </s-paragraph>
        <s-paragraph>
          <strong>━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</strong>
        </s-paragraph>

        {/* Table Rows */}
        {customers.map((customer) => (
          <div key={customer.id}>
            <s-paragraph>
              <strong>{customer.name}</strong> | {customer.phone} | {customer.email} |
              💎 {customer.total_points.toLocaleString()} pts | 🛒 {customer.total_orders} orders
            </s-paragraph>
            <s-paragraph>
              <s-link href={`/app/customers/${customer.id}`}>
                <s-button variant="primary">View Details →</s-button>
              </s-link>
            </s-paragraph>
            <s-paragraph>
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </s-paragraph>
          </div>
        ))}
      </s-section>

      {/* Sidebar - Quick Stats */}
      <s-section slot="aside" heading="Quick Stats">
        <s-paragraph>
          <strong>Top Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          {customers.reduce((max, c) => c.total_points > max.total_points ? c : max).name}
          ({customers.reduce((max, c) => c.total_points > max.total_points ? c : max).total_points.toLocaleString()} points)
        </s-paragraph>

        <s-paragraph>
          <strong>Average Points per Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          {Math.round(customers.reduce((sum, c) => sum + c.total_points, 0) / customers.length).toLocaleString()} points
        </s-paragraph>

        <s-paragraph>
          <strong>Average Orders per Customer:</strong>
        </s-paragraph>
        <s-paragraph>
          {Math.round(customers.reduce((sum, c) => sum + c.total_orders, 0) / customers.length)} orders
        </s-paragraph>
      </s-section>

      {/* Sidebar - Filters */}
      <s-section slot="aside" heading="Filter Options">
        <s-paragraph>
          <strong>Sort by:</strong>
        </s-paragraph>
        <s-select name="sort" label="Sort customers">
          <option value="points_desc">Most Points</option>
          <option value="points_asc">Least Points</option>
          <option value="orders_desc">Most Orders</option>
          <option value="orders_asc">Least Orders</option>
          <option value="name_asc">Name (A-Z)</option>
        </s-select>

        <s-paragraph>
          <strong>Filter by Points:</strong>
        </s-paragraph>
        <s-select name="points_filter" label="Points range">
          <option value="all">All Customers</option>
          <option value="0-500">0 - 500 points</option>
          <option value="501-1000">501 - 1000 points</option>
          <option value="1001-2000">1001 - 2000 points</option>
          <option value="2001+">2001+ points</option>
        </s-select>
      </s-section>

      {/* Sidebar - Bulk Actions */}
      <s-section slot="aside" heading="Bulk Actions">
        <s-paragraph>
          Select multiple customers to perform bulk actions:
        </s-paragraph>
        <s-button variant="secondary">Export Data</s-button>
        <s-paragraph></s-paragraph>
        <s-button variant="secondary">Send Bulk Email</s-button>
        <s-paragraph></s-paragraph>
        <s-button variant="secondary">Add Bonus Points</s-button>
      </s-section>

      {/* Sidebar - Help */}
      <s-section slot="aside" heading="Need Help?">
        <s-paragraph>
          Learn more about managing customers:
        </s-paragraph>
        <s-unordered-list>
          <s-list-item>
            <s-link href="/app/support">Support Center</s-link>
          </s-list-item>
          <s-list-item>
            <s-link href="https://docs.loyaltypoints.app/customers" target="_blank">
              Customer Management Guide
            </s-link>
          </s-list-item>
        </s-unordered-list>
      </s-section>
    </s-page>
  );
}
