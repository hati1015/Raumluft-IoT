import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      latest: {},
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    fetch('/api/v1/data')
      .then(res => {
        if (res.status !== 200) {
          console.log(
            'Looks like there was a problem. Status Code: ' + res.status
          );
          return;
        }
        return res.json();
      })
      .then(data =>
        this.setState({
          data: data.response,
        })
      )
      .catch(err => console.log('Fetch error:', err));
  };

  render() {
    return (
      <div className="App helvetica">
        <h1 className="tc">Raumluftüberwachung</h1>
        <div className="flex flex-column ml5">
          {/* <table>
            <td>
              <tr>Sensortyp</tr>
              <tr>Messzeit</tr>
              <tr>Messdaten:</tr>
              <tr>Temperatur in °C</tr>
              <tr>CO2 in ppm</tr>
              <tr>TVOC in ppb</tr>
              <tr>Druck in Pa</tr>
              <tr>Höhemeter in m</tr>
              <tr>Luftfeuchte in %</tr>
            </td>
            <td>
              <tr>DROPDOWN</tr>
              <tr>ss</tr>
              <br />
              <tr>s</tr>
              <tr>VAR</tr>
              <tr>VAR</tr>
              <tr>VAR</tr>
              <tr>VAR</tr>
              <tr>VAR</tr>
            </td>
          </table> */}
        </div>
        <div className="ma5">
          <ReactTable
            data={this.state.data}
            columns={[
              {
                Header: 'Info',
                columns: [
                  {
                    Header: 'Messzeit',
                    accessor: 'time',
                  },
                  {
                    Header: 'Sensortyp',
                    id: 'sensor',
                    accessor: data => data.sensor,
                  },
                ],
              },
              {
                Header: 'Messdaten',
                columns: [
                  {
                    Header: 'CO2 in ppm',
                    accessor: 'co2',
                  },
                  {
                    Header: 'Temp in °C',
                    id: 'temp',
                    accessor: data => data.temp,
                  },
                  {
                    Header: 'TVOC in ppb',
                    id: 'tvoc',
                    accessor: data => data.tvoc,
                  },
                  {
                    Header: 'Druck in Pa',
                    id: 'pressure',
                    accessor: data => data.pressure,
                  },
                  {
                    Header: 'Höhemeter in m',
                    id: 'altitude',
                    accessor: data => data.altitude,
                  },
                  {
                    Header: 'Luftfeuchte in %',
                    id: 'humidity',
                    accessor: data => data.humidity,
                  },
                ],
              },
            ]}
            defaultPageSize={10}
            className="-striped -highlight"
          />
          <br />
        </div>
      </div>
    );
  }
}

export default App;
