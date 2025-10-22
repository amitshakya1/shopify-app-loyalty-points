import { useNavigate } from "react-router";

export default function CustomersPage() {
  const navigate = useNavigate();

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

      {/* Customer Table */}
      <s-section padding="none" accessibilityLabel="Customers table section">
        <s-table>
          <s-grid slot="filters" gap="small-200" gridTemplateColumns="1fr auto">
            <s-text-field
              icon="search"
              placeholder="Search customers by name, email, or phone"
            ></s-text-field>
            <s-button
              icon="sort"
              variant="secondary"
              interestFor="sort-tooltip"
              commandFor="sort-actions"
            ></s-button>
            <s-tooltip id="sort-tooltip">
              <s-text>Sort</s-text>
            </s-tooltip>
            <s-popover id="sort-actions">
              <s-stack gap="none">
                <s-box padding="small">
                  <s-choice-list label="Sort by" name="Sort by">
                    <s-choice value="name" selected>Customer Name</s-choice>
                    <s-choice value="points">Total Points</s-choice>
                    <s-choice value="orders">Total Orders</s-choice>
                    <s-choice value="email">Email</s-choice>
                  </s-choice-list>
                </s-box>
                <s-divider></s-divider>
                <s-box padding="small">
                  <s-choice-list label="Order by" name="Order by">
                    <s-choice value="asc" selected>A-Z / Low to High</s-choice>
                    <s-choice value="desc">Z-A / High to Low</s-choice>
                  </s-choice-list>
                </s-box>
              </s-stack>
            </s-popover>
          </s-grid>
          <s-table-header-row>
            <s-table-header listSlot="primary">Customer</s-table-header>
            <s-table-header>Email</s-table-header>
            <s-table-header>Phone</s-table-header>
            <s-table-header format="numeric">Points</s-table-header>
            <s-table-header format="numeric">Orders</s-table-header>
            <s-table-header listSlot="secondary">Action</s-table-header>
          </s-table-header-row>
          <s-table-body>
            {customers.map((customer) => (
              <s-table-row key={customer.id} clickDelegate={`${customer.id}-checkbox`}>
                <s-table-cell>
                  <s-stack direction="inline" gap="small" alignItems="center">
                    <s-checkbox id={`${customer.id}-checkbox`}></s-checkbox>
                    <div
                      onClick={() => navigate(`/app/customers/${customer.id}`)}
                      style={{
                        cursor: 'pointer',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        width: '40px',
                        height: '40px',
                        display: 'inline-block'
                      }}
                    >
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name)}&background=random&size=80`}
                        alt={`${customer.name} avatar`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <s-link
                      href={`/app/customers/${customer.id}`}
                    >
                      {customer.name}
                    </s-link>
                  </s-stack>
                </s-table-cell>
                <s-table-cell>{customer.email}</s-table-cell>
                <s-table-cell>{customer.phone}</s-table-cell>
                <s-table-cell>💎 {customer.total_points.toLocaleString()}</s-table-cell>
                <s-table-cell>🛒 {customer.total_orders}</s-table-cell>
                <s-table-cell>
                  <s-badge color="base" tone="success">Active</s-badge>
                </s-table-cell>
              </s-table-row>
            ))}
          </s-table-body>
        </s-table>
      </s-section>



    </s-page>
  );
}
