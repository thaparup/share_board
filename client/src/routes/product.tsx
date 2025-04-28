import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react';

export const Route = createFileRoute('/product')({
  component: RouteComponent,
})

function RouteComponent() {


  const [query, setQuery] = useState<string>('');

  const names = [
    "ALICE", "Bob", "Charlie", "David", "Diana", "Eve", "Frank",
    "Grace", "Hannah", "Ivy", "Jack", "Karen", "Leo", "Mike",
    "Nina", "Oscar", "Paul", "Quincy", "Rachel", "Steve",
    "Tina", "Uma", "Victor", "Wendy", "Xander", "Yara", "Zane"
  ];

  // const filteredNames = query
  //   ? names.filter(name => name.toLowerCase().includes(query.toLowerCase()))
  //   : [];
  const numbers = [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
    "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
    "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
    "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
    "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
    "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
    "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
    "81", "82", "83", "84", "85", "86", "87", "88", "89", "90",
    "91", "92", "93", "94", "95", "96", "97", "98", "99", "100"
  ];

  const filterredNumArray = query.length === 0 ? [] : numbers.filter((num) => num.includes(query))
  console.log("query", query)
  console.log('filter number array', filterredNumArray)
  return <div style={{ fontFamily: "sans-serif", padding: "20px", maxWidth: '300px', margin: 'auto' }}>
    {/* <h2>Search for a name</h2>
    <input
      type="text"
      placeholder="Start typing..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      style={{ padding: "8px", width: "300px" }}
      className='ring-2 ring-amber-500'
    />
    <div style={{ marginTop: "10px" }}>
      {filteredNames.map((name, index) => (
        <div key={index} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
          {name}
        </div>
      ))}
    </div> */}

    <h1>Search for number</h1>
    <input type="text" className='ring-2 ring-amber-500' onChange={(e) => setQuery(e.target.value)} value={query} />
    <div style={{ marginTop: "10px", }} className='border-2 border-gray-600 p-4'>
      {filterredNumArray.map((name, index) => (
        <div key={index} style={{ padding: "5px 0", borderBottom: "1px solid #eee" }}>
          {name}
        </div>
      ))}
    </div>
  </div>
}
