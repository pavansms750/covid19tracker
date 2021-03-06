import React, { Component } from 'react'
import axios from 'axios';
import { statewise } from '../core/apidata';

export default class district extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            districtData : [],
            error : ''
        }
    }
    
    componentDidMount(){
        axios.get(statewise)
        .then(res =>{
            // console.log("district wise Data: ",res);
            this.setState({districtData : res.data});
        })
        .catch(err => {
            // console.log("Error While Retriving Data");
            this.setState({error : "Error retriving data"});
        })
    }

    render() {
        const {districtData,error} = this.state
        return (
            <div className="container">
                <h3 className="my-3">State - District wise data</h3>
                <div id="accordion">
                {   
                    districtData.map((item) => 
                        <div className="card text-uppercase m-2" key={item.state}>
                            <div className="card-header text-left" data-toggle="collapse" href={'#'+item.state.replace(/ /g,"_")}>
                                <a className="card-link font-weight-bold text-dark">
                                    {item.state}
                                </a>
                            </div>
                            <div id={item.state.replace(/ /g,"_")} className="collapse" data-parent="#accordion">
                                <div className="card-body">
                                    <div className="table-responsive">
                                    <table className="table table-borderless table-bordered table-striped table-hover mt-3 stateDataTable">
                                        <thead className="bg-secondary text-white">
                                            <tr>
                                                <th className="text-left">district</th>
                                                <th>confirmed</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                item.districtData.map(disdata => 
                                                    <tr key={disdata.district}>
                                                        <td className="text-left">{disdata.district}</td>
                                                        <td>{disdata.confirmed}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )  
                }
                </div>
            </div>
        )
    }
}
