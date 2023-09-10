'use client'

import {
  MarkChatReadRounded, CalendarMonthRounded, RemoveRedEyeOutlined
} from '@mui/icons-material';
import { CategoryScale, Chart as ChartJS, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function PageClient({ post }) {
  const readsToday = post.stats.viewHistory[new Date().getMonth()][new Date().getDate() - 1];
  const readsYesterday = post.stats.viewHistory[new Date().getMonth()][new Date().getDate() - 2];
  const readsLastMonth = post.stats.viewHistory[new Date().getMonth() - 1].reduce((a, b) => a + b, 0);
  const readsCurrentMonth = post.stats.viewHistory[new Date().getMonth()].reduce((a, b) => a + b, 0);
  const pctIncreaseSinceLastMonth = parseFloat((readsCurrentMonth - readsLastMonth) / readsLastMonth * 100).toFixed(2);
  const pctIncreaseSinceYesterday = parseFloat((readsToday - readsYesterday) / readsYesterday * 100).toFixed(2);
  let delayed;

  const past30DaysLabels = [...Array(post.stats.viewHistory[new Date().getMonth()].length).keys()].map(index => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.toLocaleString('en-GB', { day: 'numeric', month: 'short' })
  }).reverse();

  const currentMonthData = post.stats.viewHistory[new Date().getMonth()];
  const pastMonthData = post.stats.viewHistory[new Date().getMonth() - 1];
  const past30DaysData = [...Array(post.stats.viewHistory[new Date().getMonth()].length).keys()].map(index => {
    const date = new Date();
    date.setDate(date.getDate() - index);
    return date.getMonth() === new Date().getMonth() ? currentMonthData[date.getDate() - 1] : pastMonthData[date.getDate() - 1]
  }).reverse();



  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-slate-800 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Total reads</div>
                <div className='text-3xl text-white'>{post.stats.totalViews}</div>
              </div>
              <CalendarMonthRounded fontSize='large' />
            </div>
          </div>
          <div className="bg-slate-800 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Reads today</div>
                <div className='text-3xl text-white'>{readsToday}</div>
              </div>
              <MarkChatReadRounded fontSize='large' />
            </div>
            <div>
              {!pctIncreaseSinceYesterday && <span className="text-gray-500">0%</span>}
              {pctIncreaseSinceYesterday > 0 && <span className="text-green-500">{pctIncreaseSinceYesterday}%</span>}
              {pctIncreaseSinceYesterday <= 0 && <span className="text-red-500">{pctIncreaseSinceYesterday}%</span>}
              <span>&nbsp;since yesterday</span>
            </div>
          </div>
          <div className="bg-slate-800 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Reads this month</div>
                <div className='text-3xl text-white'>{readsCurrentMonth}</div>
              </div>
              <MarkChatReadRounded fontSize='large' />
            </div>
            <div>
              {!pctIncreaseSinceLastMonth && <span className="text-gray-500">0%</span>}
              {pctIncreaseSinceLastMonth > 0 && <span className="text-green-500">{pctIncreaseSinceLastMonth}%</span>}
              {pctIncreaseSinceLastMonth <= 0 && <span className="text-red-500">{pctIncreaseSinceLastMonth}%</span>}
            </div>
          </div>
          <div className="bg-slate-800 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Total traffic</div>
                <div className='text-3xl text-white'>{post.stats.totalViews}</div>
              </div>
              <MarkChatReadRounded fontSize='large' />
            </div>
            <div>a</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className='col-span-1 dark:bg-slate-800 py-5 px-6 rounded-lg'>
            <div className='uppercase opacity-75 text-sm'>Manage Post</div>
            <div className='grid grid-cols-3 mt-4'>
              <a href={`https://nexvest.vercel.app/blog/${post._id}`}
                className="px-4 py-6 m-2 text-center border-2 border-slate-900 dark:hover:border-slate-500 transition-all bg-slate-900 rounded-lg">
                <button>
                  <RemoveRedEyeOutlined fontSize='large' color='info' />
                  <div>Preview Post</div>
                </button>
              </a>
              <a href={`https://nexvest.vercel.app/blog/${post._id}`}
                className="px-4 py-6 m-2 text-center border-2 border-slate-900 dark:hover:border-slate-500 transition-all bg-slate-900 rounded-lg">
                <button>
                  <RemoveRedEyeOutlined fontSize='large' color='info' />
                  <div>Preview Post</div>
                </button>
              </a>
            </div>
          </div>
          <div className='col-span-2 dark:bg-slate-800 py-5 px-6 rounded-lg'>
            <div className='uppercase opacity-75 text-sm'>Blog performance</div>
            <Line data={{
              labels: past30DaysLabels,
              datasets: [{
                label: 'Reads',
                data: past30DaysData,
                borderColor: '#3B82F6',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: true
              }]
            }}
              options={{
                responsive: true,
                animation: {
                  onComplete: () => {
                    delayed = true;
                  },
                  delay: (context) => {
                    let delay = 0;
                    if (context.type === 'data' && context.mode === 'default' && !delayed) {
                      delay = context.dataIndex * 100 + context.datasetIndex * 100;
                    }
                    return delay;
                  },
                },
                tension: 0.4,
              }} />
          </div>
        </div>
      </div>
    </>
  )
}
