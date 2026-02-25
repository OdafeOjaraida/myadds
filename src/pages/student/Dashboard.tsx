import { motion } from "motion/react";
import { UtensilsCrossed, Shirt, Calendar, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Student Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Meals Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
              <UtensilsCrossed className="w-5 h-5 mr-2 text-indigo-600" />
              Today's Meals
            </h2>
            <span className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
              2 Remaining
            </span>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100 opacity-50">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center mr-4">
                  <UtensilsCrossed className="w-5 h-5 text-neutral-500" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900 line-through">Breakfast</p>
                  <p className="text-sm text-neutral-500">07:00 AM - 09:00 AM</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Consumed</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-100">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mr-4">
                  <UtensilsCrossed className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">Dinner</p>
                  <p className="text-sm text-neutral-500">07:30 PM - 09:30 PM</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Pending</span>
            </div>
          </div>
        </motion.div>

        {/* Laundry Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-neutral-900 flex items-center">
              <Shirt className="w-5 h-5 mr-2 text-indigo-600" />
              Laundry Status
            </h2>
          </div>
          
          <div className="p-6 rounded-xl bg-indigo-50 border border-indigo-100 text-center">
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
              <Shirt className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-1">Washing in Progress</h3>
            <p className="text-sm text-neutral-600 mb-4">Your basket #1042 is currently being washed.</p>
            
            <div className="flex items-center justify-center space-x-2 text-sm font-medium text-indigo-700">
              <Clock className="w-4 h-4" />
              <span>Estimated finish: Today, 4:00 PM</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-neutral-900 mb-3">Recent Activity</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-indigo-500 mr-3"></div>
                <span className="text-neutral-600 flex-1">Basket dropped off</span>
                <span className="text-neutral-400">Today, 9:15 AM</span>
              </div>
              <div className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-3"></div>
                <span className="text-neutral-600 flex-1">Basket picked up</span>
                <span className="text-neutral-400">Mon, 2:30 PM</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
