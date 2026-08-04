import { useState } from "react";
import { motion } from "framer-motion";

export default function Login({ onLogin, onBack }) {
  const [email, setEmail] = useState("admin@profile360.com");
  const [password, setPassword] = useState("admin123");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md rounded-[32px] border border-slate-200/70 bg-white/70 p-8 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-[24px] bg-gradient-to-br from-violet-600 to-cyan-500 text-2xl font-extrabold text-white shadow-xl shadow-violet-500/30">
            360
          </div>

          <h1 className="font-display text-3xl font-bold">Admin Login</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Sign in to manage your profile, projects, and messages.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-5">
          <div>
            <label className="mb-2 block font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-300/70 bg-white/75 px-4 py-3.5 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/15 dark:border-white/10 dark:bg-white/5"
            />
          </div>

          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-4 font-bold text-white shadow-lg shadow-violet-500/25 transition hover:-translate-y-1"
          >
            Login
          </button>

          <button
            type="button"
            onClick={onBack}
            className="rounded-2xl border border-slate-200/70 bg-white/70 px-5 py-4 font-bold dark:border-white/10 dark:bg-white/5"
          >
            Back to Profile
          </button>
        </form>

        <div className="mt-6 rounded-3xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm leading-6 text-cyan-700 dark:text-cyan-300">
          Demo login:
          <br />
          Email: admin@profile360.com
          <br />
          Password: admin123
        </div>
      </motion.div>
    </div>
  );
}