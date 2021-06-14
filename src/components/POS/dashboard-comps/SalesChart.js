import React from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';

const SalesChart = () => {

    const totalSales = useSelector((store) => {
        return store.bills;
    })

      const monthSale=(month)=>{
        let sales=0;
        totalSales.forEach((bill)=>{
            if(bill.date.includes(month)){
                sales+= bill.total;
            }
        })
        return sales;
    }
    return (
        <div>
            <Bar
                data={{
                    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Total Monthly Sales',
                            data: [monthSale('-01-'), monthSale('-02-'), monthSale('-03-'), monthSale('-04-'), monthSale('-05-'), monthSale('-06-'), monthSale('-07-'), monthSale('-08-'), monthSale('-09-'), monthSale('-10-'), monthSale('-11-'), monthSale('-12-')],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                            ],
                            borderWidth: 1
                        },
                    ]
                }}
                height={400}
                width={600}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            suggestedMin: 50,
                            suggestedMax: 100
                        }
                    }
                }}
            />
        </div>
    )
}

export default SalesChart
