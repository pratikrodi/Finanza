import React, { Component } from "react";
import { Table } from "reactstrap";
import axios from "axios";
import moment from "moment-timezone";
moment.tz.setDefault("America/New_York");

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    axios.get("http://localhost:5000/getEvents")
      .then((res) => {
        this.setState({
          events: res.data,
        });
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Event List</h1>
        <Table striped>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fees</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.events.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{moment(event.dateTime).format("YYYY-MM-DD")}</td>
                <td>{moment(event.dateTime).format("hh:mm A")}</td>
                <td>${event.fees}</td>
                <td>
                  <a href={`/book/${event.id}`}>Book Event Ticket</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CreateEvent;
