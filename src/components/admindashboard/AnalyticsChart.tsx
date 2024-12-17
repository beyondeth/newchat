// components/admin/AnalyticsChart.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AnalyticsData {
  name: string; // 월 이름 (Jan, Feb, etc.)
  uv: number; // 게시물 수
  pv: number; // 조회수
  amt: number; // 활성 사용자 수
}

const availableFilters = [
  {
    value: "uv",
    label: "Total Posts",
  },
  {
    value: "pv",
    label: "Total Views",
  },
  {
    value: "amt",
    label: "Active Users",
  },
];

const AnalyticsChart = () => {
  const [selection, setSelection] = useState("pv");
  const [data, setData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch analytics data");
        }

        setData(data);
      } catch (err) {
        console.error("Analytics error:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-[300px]">
            Loading analytics data...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-[300px] text-red-500">
            Error: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics For This Year</CardTitle>
        <CardDescription>
          {selection === "uv" && "Monthly Post Count"}
          {selection === "pv" && "Monthly View Count"}
          {selection === "amt" && "Monthly Active Users"}
        </CardDescription>
        <Select onValueChange={setSelection} defaultValue="pv">
          <SelectTrigger className="w-96 h-8">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart width={1100} height={300} data={data}>
              <Line
                type="monotone"
                dataKey={selection}
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsChart;
