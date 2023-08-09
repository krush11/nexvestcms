'use client'

import { DeleteOutlined, EditOutlined } from '@mui/icons-material';
import Link from 'next/link';

export default function Page({ draftList }) {

  async function deleteDraft(draft) {
    await fetch(`/api/drafts?draftId=${draft._id}`, {
      method: 'DELETE',
    }).then(res => res.json())
      .then(data => window.location.reload())
  }

  return (
    <>
      <div>
        {/* Extra space kept above table if something needs to be added */}
        <div>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Last updated at</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {draftList.map((draft) => (
                <tr key={draft._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">{draft.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                    {new Date(draft.updatedAt).toLocaleDateString('en-GB', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium cursor-pointer">
                    <Link className='ml-2 text-blue-300 hover:text-blue-600' href={`/drafts/${draft._id}`}>
                      <EditOutlined />
                    </Link>
                    <button type='button' className='ml-2 text-red-300 hover:text-red-600' onClick={() => { deleteDraft(draft) }} >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}