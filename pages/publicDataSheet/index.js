import React from 'react'
import DataGrid from 'react-data-grid';

export default function index() {
    const columns = [
        { key: 'subjectName', name: '科目名' },
        { key: 'subjectDscrp', name: '科目概要' },
        { key: 'subjectColor', name: '色' },
      ];      
    const rows = [
        {
            subjectName: '数学',
            subjectDscrp: 'Example',
            subjectColor: <button>beruh</button>
        },
        { subjectName: '英語', subjectDscrp: 'Demo' }
    ];

    return (
        <div>
            <DataGrid
                onCopy
                columns={columns}
                rows={rows}
            />
        </div>
    )
}
