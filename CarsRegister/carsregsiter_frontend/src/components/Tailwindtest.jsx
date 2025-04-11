export default function TailwindTest() {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🚀 Tailwind läuft!</h1>
          <p className="text-gray-600 mb-6">
            Wenn du diesen Text mit Farben, Schatten und Layout siehst, ist Tailwind erfolgreich installiert.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Super!
          </button>
        </div>
      </div>
    )
  }