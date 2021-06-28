import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux';
import moment from 'moment'

const SalesChart = () => {

    const totalSales = useSelector((store) => {
        return store.bills;
    })


    const monthlySale = (month) => {
        let sales = 0;
        totalSales.forEach((bill) => {
            if (bill.date.includes(month)) {
                sales += bill.total;
            }
        })
        return sales;
    }

    const yearlyRevenue = () => {
        const result = [];
        for (let i = 1; i <= moment.monthsShort().length; i++) {
            if (i <= 9) {
                result.push(monthlySale(`-0${i}-`))
            } else{
                result.push(monthlySale(`-${i}-`))
            } 
        }
        return result;
    }

    return (
        <div>
            <Bar
                data={{
                    labels: moment.monthsShort(),
                    datasets: [
                        {
                            label: 'Total Monthly Sales',
                            data: yearlyRevenue(),
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
