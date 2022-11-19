// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InfoContract {
    struct PatientInfo {
        uint256 patientId;
        string patientName;
        uint256 age;
        string sex;
        uint256 weight;
        uint256 phoneNo;
        string medicalProb;
        string miscellaneous;
        uint256 bill;
    }
    PatientInfo[] private patients;

    function addpatient(
        string memory _patientName,
        uint256 _age,
        string memory _sex,
        uint256 _weight,
        uint256 _phoneNo,
        string memory _medicalProb,
        string memory _miscellaneous,
        uint256 _bill
    ) external {
        uint256 _patientId = patients.length;

        patients.push(
            PatientInfo(
                _patientId,
                _patientName,
                _age,
                _sex,
                _weight,
                _phoneNo,
                _medicalProb,
                _miscellaneous,
                _bill
            )
        );
    }

    function showDetails(uint256 _patientId)
        external
        view
        returns (PatientInfo memory)
    {
        bool _isPresent = false;
        for (uint256 i = 0; i < patients.length; i++) {
            if (patients[i].patientId == _patientId) {
                _isPresent = true;
                return patients[i];
            }
        }
        PatientInfo memory temporary;

        if (_isPresent == false) {
            return temporary;
        }
    }
}
