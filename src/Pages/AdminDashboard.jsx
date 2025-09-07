import React, { useContext } from "react";
import { LogContext } from "../Context/AuthContext";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const { users, setUsers } = useContext(LogContext);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Mark product as delivered
  const markAsDelivered = (userEmail, productId) => {
    setUsers((prev) => {
      const updatedUsers = prev.map((user) => {
        if (user.email !== userEmail) return user;

        const product = user.CheckedOutProducts?.find((p) => p.id === productId);
        if (!product) return user;

        return {
          ...user,
          CheckedOutProducts: user.CheckedOutProducts.filter((p) => p.id !== productId),
          DeliveredProducts: [...(user.DeliveredProducts ?? []), product],
        };
      });

      localStorage.setItem("Users", JSON.stringify(updatedUsers));
      return updatedUsers;
    });
  };

  // Stats calculations
  const totalCheckedOut = users.reduce(
    (acc, user) => acc + (user.CheckedOutProducts?.length || 0),
    0
  );
  const totalDelivered = users.reduce(
    (acc, user) => acc + (user.DeliveredProducts?.length || 0),
    0
  );
  const totalRevenue = users.reduce(
    (acc, user) =>
      acc +
      (user.DeliveredProducts ?? []).reduce(
        (sum, p) => sum + p.price * p.quantity,
        0
      ),
    0
  );

  // Revenue per user
  const revenuePerUser = users.map((user) => ({
    email: user.email,
    revenue: (user.DeliveredProducts ?? []).reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    ),
  }));

  // Top products
  const productSales = {};
  users.forEach((user) => {
    (user.DeliveredProducts ?? []).forEach((p) => {
      if (!productSales[p.title]) productSales[p.title] = 0;
      productSales[p.title] += p.quantity;
    });
  });
  const topProducts = Object.entries(productSales)
    .map(([title, quantity]) => ({ title, quantity }))
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-emerald-700">
        Admin Dashboard
      </h1>

      {/* Stats Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-emerald-100 rounded-lg text-center">
          <h2 className="font-bold">Total Users</h2>
          <p>{users.length}</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg text-center">
          <h2 className="font-bold">Checked Out</h2>
          <p>{totalCheckedOut}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg text-center">
          <h2 className="font-bold">Delivered</h2>
          <p>{totalDelivered}</p>
        </div>
        <div className="p-4 bg-blue-100 rounded-lg text-center">
          <h2 className="font-bold">Revenue</h2>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="flex flex-wrap gap-6 mb-8">
        {/* Orders vs Delivered */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold mb-2 text-gray-800">
            Orders vs Delivered
          </h3>
          <PieChart width={250} height={250}>
            <Pie
              data={[
                { name: "Checked Out", value: totalCheckedOut },
                { name: "Delivered", value: totalDelivered },
              ]}
              cx="50%"
              cy="50%"
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {[
                { name: "Checked Out", value: totalCheckedOut },
                { name: "Delivered", value: totalDelivered },
              ].map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Revenue per User */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold mb-2 text-gray-800">Revenue per User</h3>
          <BarChart width={300} height={250} data={revenuePerUser}>
            <XAxis dataKey="email" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#82ca9d" />
          </BarChart>
        </div>

        {/* Top Products */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="font-bold mb-2 text-gray-800">Top Products</h3>
          <BarChart width={300} height={250} data={topProducts}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Users & Products */}
      {users?.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="space-y-8">
          {users.map((user) => {
            const checkedOut = user.CheckedOutProducts ?? [];
            const delivered = user.DeliveredProducts ?? [];

            return (
              <div
                key={user.email}
                className="p-4 border border-emerald-600 rounded-lg shadow-md bg-white"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {user.email}
                </h2>

                {/* Checked Out Section */}
                <div className="mt-3">
                  <h3 className="font-bold text-emerald-700 mb-1">
                    Checked Out Products
                  </h3>
                  {checkedOut.length > 0 ? (
                    <ul className="space-y-2">
                      {checkedOut.map((product) => (
                        <li
                          key={product.id}
                          className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-md"
                        >
                          <span className="text-gray-700">
                            {product.title} (x{product.quantity}) — $
                            {(product.price * product.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() =>
                              markAsDelivered(user.email, product.id)
                            }
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products waiting for delivery.</p>
                  )}
                </div>

                {/* Delivered Section */}
                <div className="mt-4">
                  <h3 className="font-bold text-emerald-700 mb-1">
                    Delivered Products
                  </h3>
                  {delivered.length > 0 ? (
                    <ul className="space-y-1">
                      {delivered.map((product) => (
                        <li
                          key={product.id}
                          className="flex justify-between items-center bg-green-50 px-3 py-2 rounded-md text-green-700"
                        >
                          ✅ {product.title} (x{product.quantity})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No products delivered yet.</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
