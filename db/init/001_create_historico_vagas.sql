CREATE TABLE IF NOT EXISTS historico_vagas (
  id         INT UNSIGNED             NOT NULL AUTO_INCREMENT,
  sensor_id  VARCHAR(36)              NOT NULL,
  status     ENUM('ocupado', 'livre') NOT NULL,
  data       DATETIME                 NOT NULL,
  PRIMARY KEY (id),
  INDEX idx_sensor_data (sensor_id, data DESC)
);
