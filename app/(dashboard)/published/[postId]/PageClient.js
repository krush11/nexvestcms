'use client'

import {
  MarkChatReadRounded, CalendarMonthRounded, RemoveRedEyeOutlined
} from '@mui/icons-material';
import Chart from 'chart.js/auto'
import { useEffect } from 'react';

export default function Page({ post }) {
  const readsToday = post.stats.viewHistory[new Date().getMonth()][new Date().getDate() - 1];
  const readsYesterday = post.stats.viewHistory[new Date().getMonth()][new Date().getDate() - 2];
  const pctIncreaseSinceYesterday = parseFloat((readsToday - readsYesterday) / readsYesterday * 100).toFixed(2);

  useEffect(() => {
    new Chart(document.getElementById('read-chart'), {
      type: 'line',
      data: {
        labels: () => {
          const past7Days = [...Array(7).keys()].map(index => {
            const date = new Date();
            date.setDate(date.getDate() - index);

            return date;
          });
          console.log(past7Days);
          return past7Days
        },
        datasets: [{
          label: 'Reads',
          data: () => {
            const past7Days = post.stats.viewHistory[new Date().getMonth()].slice(new Date().getDate() - 7, new Date().getDate());
            console.log(past7Days);
            return past7Days
          }
        }]
      }
    })
  })

  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-zinc-900 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Total reads</div>
                <div className='text-3xl text-white'>{post.stats.totalViews}</div>
              </div>
              <CalendarMonthRounded fontSize='large' />
            </div>
          </div>
          <div className="bg-zinc-900 py-5 px-6 rounded-lg">
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
          <div className="bg-zinc-900 py-5 px-6 rounded-lg">
            <div className="flex flex-row justify-between">
              <div>
                <div className="uppercase text-sm opacity-75">Total traffic</div>
                <div className='text-3xl text-white'>{post.stats.totalViews}</div>
              </div>
              <MarkChatReadRounded fontSize='large' />
            </div>
            <div>a</div>
          </div>
          <div className="bg-zinc-900 py-5 px-6 rounded-lg">
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
          <div className='col-span-1 dark:bg-zinc-900 py-5 px-6 rounded-lg'>
            <div className='uppercase opacity-75 text-sm'>Manage Post</div>
            <div className='flex flex-wrap justify-center mt-4'>
              <a href={`https://nexvest.vercel.app/blog/${post._id}`} className="p-8 m-2 dark:hover:bg-neutral-800 rounded-lg">
                <button>
                  <RemoveRedEyeOutlined fontSize='large' color='info' />
                  <div>Preview Post</div>
                </button>
              </a>
            </div>
          </div>
          <div className='col-span-2 dark:bg-zinc-900 py-5 px-6 rounded-lg'>
            <canvas id="read-chart" className='h-full' aria-label="Posts read chart" role="img" />
          </div>
        </div>
      </div>
    </>
  )
}
