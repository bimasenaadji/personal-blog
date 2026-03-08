import { Briefcase, FileText, CheckCircle, Clock } from "lucide-react";

interface DashboardViewProps {
  isDarkMode: boolean;
  stats: {
    total: number;
    published: number;
    drafts: number;
  };
  recentPosts: Array<{
    id: string;
    title: string;
    status: string;
    date: string;
  }>;
}

export default function DashboardView({
  isDarkMode,
  stats,
  recentPosts,
}: DashboardViewProps) {
  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div
        className={`flex items-center gap-2 text-sm transition-colors ${
          isDarkMode ? "text-muted-foreground" : "text-zinc-600"
        }`}
      >
        <span>Home</span>
        <span>/</span>
        <span className={isDarkMode ? "text-foreground" : "text-zinc-900"}>
          Dashboard
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1
          className={`text-4xl font-bold transition-colors ${
            isDarkMode ? "text-foreground" : "text-zinc-900"
          }`}
        >
          Overview
        </h1>
        <p
          className={`text-lg transition-colors ${
            isDarkMode ? "text-muted-foreground" : "text-zinc-600"
          }`}
        >
          Welcome back. Ready to write?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Posts */}
        <div
          className={`rounded-2xl p-8 md:p-6 hover:border-accent/50 transition-colors border ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`text-sm mb-2 transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Total Posts
              </p>
              <p
                className={`text-3xl font-bold transition-colors ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {stats.total}
              </p>
            </div>
            <div
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-emerald-500/10" : "bg-emerald-50"
              }`}
            >
              <FileText
                size={24}
                className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}
              />
            </div>
          </div>
        </div>

        {/* Published */}
        <div
          className={`rounded-2xl p-8 md:p-6 hover:border-accent/50 transition-colors border ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`text-sm mb-2 transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Published
              </p>
              <p
                className={`text-3xl font-bold transition-colors ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {stats.published}
              </p>
            </div>
            <div
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-emerald-500/10" : "bg-emerald-50"
              }`}
            >
              <CheckCircle
                size={24}
                className={isDarkMode ? "text-emerald-400" : "text-emerald-600"}
              />
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div
          className={`rounded-2xl p-8 md:p-6 hover:border-accent/50 transition-colors border ${
            isDarkMode
              ? "bg-zinc-900 border-zinc-800"
              : "bg-white border-zinc-200"
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p
                className={`text-sm mb-2 transition-colors ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Drafts
              </p>
              <p
                className={`text-3xl font-bold transition-colors ${
                  isDarkMode ? "text-white" : "text-zinc-900"
                }`}
              >
                {stats.drafts}
              </p>
            </div>
            <div
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "bg-amber-500/10" : "bg-amber-50"
              }`}
            >
              <Clock
                size={24}
                className={isDarkMode ? "text-amber-400" : "text-amber-600"}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div
        className={`rounded-2xl overflow-hidden border transition-colors ${
          isDarkMode
            ? "bg-zinc-900 border-zinc-800"
            : "bg-white border-zinc-200"
        }`}
      >
        <div
          className={`px-6 py-4 border-b transition-colors ${
            isDarkMode ? "border-zinc-800" : "border-zinc-200"
          }`}
        >
          <h2
            className={`text-lg font-semibold transition-colors ${
              isDarkMode ? "text-white" : "text-zinc-900"
            }`}
          >
            Recent Activity
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className={`border-b transition-colors ${
                  isDarkMode ? "border-zinc-800" : "border-zinc-200"
                }`}
              >
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.map((post) => (
                <tr
                  key={post.id}
                  className={`border-b transition-colors ${
                    isDarkMode
                      ? "border-zinc-800/50 hover:bg-zinc-800/30"
                      : "border-zinc-100 hover:bg-zinc-50"
                  }`}
                >
                  <td
                    className={`px-6 py-4 text-sm transition-colors ${
                      isDarkMode ? "text-zinc-200" : "text-zinc-900"
                    }`}
                  >
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        post.status === "Published"
                          ? isDarkMode
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-emerald-100 text-emerald-700"
                          : isDarkMode
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td
                    className={`px-6 py-4 text-sm transition-colors ${
                      isDarkMode ? "text-zinc-400" : "text-zinc-600"
                    }`}
                  >
                    {post.date}
                  </td>
                </tr>
              ))}

              {recentPosts.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-sm text-zinc-500"
                  >
                    Belum ada post. Yuk nulis!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
