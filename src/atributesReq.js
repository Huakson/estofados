const atributes=[];

atributes["StartTransaction"]="startTransactionReq";
atributes["Authorize"]="authorizeReq";
atributes["BootNotification"]="bootNotificationReq";
atributes["DiagnosticsStatusNotification"]="diagnosticsStatusNotificationReq";
atributes["FirmwareStatusNotification"]="firmwareStatusNotificationReq";
atributes["Heartbeat"]="heartbeatReq";
atributes["MeterValues"]="meterValuesReq";
atributes["StatusNotification"]="statusNotificationReq";
atributes["StopTransaction"]="stopTransactionReq";

atributes["GetConfiguration"]="getConfigurationReq";

module.exports=atributes;