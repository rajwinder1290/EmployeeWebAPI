using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeWebAPI.Models
{
    // Represent an Employee
    public class Employee
    {
        // Represent Employee ID
        public int Id { get; set; }

        // Represent First Name of Employee
        public string FirstName { get; set; }

        // Represent Last Name of Employee
        public string LastName { get; set; }

        // Represent Designation of Employee
        public string Designation { get; set; }

        // Represent Salary of Employee
        public float Salary { get; set; }
    }
}
