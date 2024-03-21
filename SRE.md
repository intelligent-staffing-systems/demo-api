## Target Processing Time as our first SLI and anomaly detection model

This has already shown to be a useful metric in regards to monitoring our application:
[Prod-notification-ui-alb alb access logs errors](https://vanotify.ddog-gov.com/logs?query=-%40elb.name%3A%28%22app%2Fprod-vetext-sms-alb%2F925c72305ee60149%22%20OR%20%22app%2Fprod-vetext-api-alb%2F465e0e334f7c13de%22%20OR%20%22app%2Fdev-notification-api-alb%2Fa944e9bf322a8099%22%20OR%20%22app%2Fdev-notification-ui-alb%2F2a2057d6ba8469d9%22%20OR%20%22app%2Fperf-notification-api-alb%2F2ea493dbf1e87771%22%20OR%20%22app%2Fprod-notification-admin-alb%2F3d52e2e0709dd2cb%22%29%20&agg_q=status%2Cservice&agg_q_source=base%2Cbase&cols=host%2Cservice&fromUser=true&index=%2A&messageDisplay=inline&refresh_mode=paused&sort_m=%2C&sort_t=%2C&storage=hot&stream_sort=desc&top_n=10%2C10&top_o=top%2Ctop&viz=pattern&x_missing=true%2Ctrue&from_ts=1710584460000&to_ts=1710627060000&live=false), between Mar 16, 4:21 am – Mar 16, 4:11 pm, may be related to the slower response times from our app at that time, having one request taking more than 5 second during this time. 

From our ALB access logs:
<img width="1129" src="https://api.zenhub.com/attachedFiles/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBeFgrQXc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--7d69bef484eed320453dc59362f5505765c572c6/image.png" alt="image.png" />

You can see we had 5xx errors with long response times from our end, one request taking over 5 seconds.  Considering that this 5xx means an error on our end, determining whether this is abnormal behavior, the cause, and if this needs its own monitor, would be a process going forward; but what I want to focus on here is the time it took for some of these errors - over 5 seconds!  This is something particularly useful available ALB Access Logs, as it indicates how long it took for the ALB to receive a response back from our server (ECS). 

### SLI SLO SLA (LI LO LA) and Target Processing Time
This is a notably useful metric for SLI, SLO, SLAs (I now remember it with LiLoLa):

1. **Definitions:**
   - **SLI (Service Level Indicator)**: A measurable quantity of service performance that reflects the user experience.
   - **SLO (Service Level Objective)**: A target value or range of values for an SLI, representing the desired level of service performance.
   - **SLA (Service Level Agreement)**: A formal agreement between a service provider (us) and the customer that includes the defined SLOs and the consequences of not meeting them 
        - NOTE: *I recommend we avoid this for now and just use internal SLIs and SLOs*

2. **Why **TARGET PROCESSING TIME** Metrics Are Important**:
   - [This article by Slack Engineering](https://slack.engineering/the-scary-thing-about-automating-deploys/) highlights the importance of monitoring deployment metrics to avoid deployment scares. Similarly, **TARGET PROCESSING TIME**—perhaps including average, standard deviation, and Z-scores (I'm still determining best approach based on the article and Datadog's available tools)—will likely give us a comprehensive understanding of our application's performance and reliability. These metrics help in identifying trends, pinpointing outliers, and understanding the overall health of our service.

3. **Relevance of **TARGET PROCESSING TIME** to SLI, SLO, SLA**:
   - **TARGET PROCESSING TIME** is a direct indicator of the user experience, making it a prime candidate for an SLI. By setting realistic SLOs around **TARGET PROCESSING TIME**, we ensure that our objectives align with maintaining a high-quality user experience. This alignment is foundational for establishing SLAs with our customers (if we so choose), as it directly correlates with the perceived performance and reliability of our app, which is the groundwork for trust and satisfaction based on data-established expectations.


