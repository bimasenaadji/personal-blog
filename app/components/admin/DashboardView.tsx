import { FileText, CheckCircle, Clock } from "lucide-react";

interface DashboardViewProps {
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
  stats,
  recentPosts,
}: DashboardViewProps) {
  return (
    <div className="space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 transition-colors">
        <span>Home</span>
        <span>/</span>
        <span className="text-zinc-900 dark:text-white font-medium">
          Dashboard
        </span>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white transition-colors">
          Overview
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 transition-colors">
          Welcome back. Ready to write?
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Posts */}
        <div className="rounded-2xl p-8 md:p-6 transition-colors border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm mb-2 text-zinc-600 dark:text-zinc-400 transition-colors">
                Total Posts
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
                {stats.total}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 transition-colors">
              <FileText
                size={24}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Published */}
        <div className="rounded-2xl p-8 md:p-6 transition-colors border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm mb-2 text-zinc-600 dark:text-zinc-400 transition-colors">
                Published
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
                {stats.published}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 transition-colors">
              <CheckCircle
                size={24}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Drafts */}
        <div className="rounded-2xl p-8 md:p-6 transition-colors border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-amber-500/50">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm mb-2 text-zinc-600 dark:text-zinc-400 transition-colors">
                Drafts
              </p>
              <p className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
                {stats.drafts}
              </p>
            </div>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 transition-colors">
              <Clock size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-2xl overflow-hidden border bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 transition-colors">
        <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white transition-colors">
            Recent Activity
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
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
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {recentPosts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-zinc-900 dark:text-zinc-200">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        post.status === "Published"
                          ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {post.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
