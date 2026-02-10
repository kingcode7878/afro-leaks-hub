import React from 'react';

export default function Profile() {
  return (
    <div className="p-10 flex flex-col items-center">
      <div className="w-24 h-24 bg-zinc-800 rounded-full mb-4 border-2 border-accent" />
      <h2 className="text-xl font-bold">User #8273</h2>
      <p className="text-zinc-500">Member since 2026</p>
      <div className="mt-10 grid grid-cols-2 gap-4 w-full">
        <div className="bg-zinc-900 p-4 rounded-xl text-center">
          <p className="text-accent font-bold text-lg">12</p>
          <p className="text-xs">Liked Leaks</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl text-center">
          <p className="text-accent font-bold text-lg">5</p>
          <p className="text-xs">Followers</p>
        </div>
      </div>
    </div>
  );
}