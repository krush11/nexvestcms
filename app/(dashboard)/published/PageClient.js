import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import Link from 'next/link';

export default function Page({ postList }) {
  return (
    <>
      <div>
        {/* Extra space kept if something needs to be added above the table */}
        <div>
          <table className="w-full max-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Views</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Last updated at</th>
                <th scope="col" className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {postList.map((post) => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">{post.stats.totalViews}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800 dark:text-gray-200">
                    {new Date(post.updatedAt).toLocaleDateString('en-GB', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium hover:text-blue-500 cursor-pointer">
                    <Link href={`/published/${post._id}`}>
                      <OpenInNewRoundedIcon />
                    </Link>
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