import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";

const RegistrationCharts = ({ data }) => {
  // Aggregate data
  const eventWise = {};

  data.forEach(item => {
    eventWise[item.events] = (eventWise[item.events] || 0) + 1;
  });

  const formatData = (obj) =>
    Object.entries(obj).map(([key, value]) => ({ name: key, count: value }));

  return (
    <div className=" mt-6 px-4 ">
      <div className="bg-[#18181b] rounded-2xl shadow-md border border-zinc-700 p-5">
        <h3 className="text-center text-primary text-lg font-semibold mb-4">
          📊 Event-wise Registrations
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={formatData(eventWise)}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#ccc" tick={{ fill: '#ccc', fontSize: 12 }} />
            <YAxis stroke="#ccc" tick={{ fill: '#ccc', fontSize: 12 }}
              allowDecimals={false} />
            <Tooltip contentStyle={{ backgroundColor: '#2d2d2d', border: 'none', color: '#fff' }} />
            <Legend wrapperStyle={{ color: '#ccc' }} />
            <Bar dataKey="count" fill="#009d97" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RegistrationCharts;
