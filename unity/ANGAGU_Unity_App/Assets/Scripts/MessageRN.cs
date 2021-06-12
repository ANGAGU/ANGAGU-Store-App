using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;
using System.Linq;
using TMPro;
using UnityEngine.UI;
using UnityEngine.UIElements;
using UnityEngine.XR.ARFoundation;
using UnityEngine.XR.ARSubsystems;
using Button = UnityEngine.UI.Button;
using Slider = UnityEngine.UI.Slider;


public class MessageRN : MonoBehaviour
{
    public Text a;
    
    void Awake()
    {
        UnityMessageManager.Instance.OnRNMessage += onMessage;
    }

    void onDestroy()
    {
        UnityMessageManager.Instance.OnRNMessage -= onMessage;
    }

    void onMessage(MessageHandler message)
    {
        a.text = "hello";
        var data = message.getData<string>();
        Debug.Log("onMessage:" + data);
        UnityMessageManager.Instance.SendMessageToRN("click");
        message.send(new { CallbackTest = "I am Unity callback" });
    }

    // Update is called once per frame
    
}
