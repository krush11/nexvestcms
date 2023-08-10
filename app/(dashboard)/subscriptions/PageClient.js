'use client'


export default function PageClient({ subscriptions }) {
  return (
    <>
      <div className="w-full inline-flex">

        {Object.keys(subscriptions).map((key, index) => {
          return (
            <div className={`mb-6`} style={{ width: `${100 / Object.keys(subscriptions).length}%` }}>
              <h1 className="mt-2 text-xl font-bold uppercase">{key} - {subscriptions[key].emails.length}</h1>
              <ol>
                {subscriptions[key].emails.map((email, index) => {
                  return (
                    <li key={index} className="mt-2">
                      <div>{email}</div>
                    </li>
                  )
                })}
              </ol>
            </div>
          )
        })}
      </div>
    </>
  )
}