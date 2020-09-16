# frozen_string_literal: true

class ApplicationComponent < ViewComponent::Base
  # include Browser::ActionController
  include ActiveModel::Validations
  include ImageHelper

  attr_reader :classes, :data_attributes

  delegate :device, to: :browser
  delegate :mobile?, to: :device

  def initialize(attrs = {})
    @options = attrs[:options] || {}
    @data = attrs[:data] || {}
    add_classes
    add_data_attributes
  end

  def add_classes
    @classes = ' '
    @classes += @options[:class] if @options[:class]
    add_margins
    add_paddings
    add_displays
    @classes
  end

  def add_margins
    @options[:margins]&.each do |breakpoint, spacers|
      spacers.each do |direction, unit|
        direction = direction.to_s.first
        @classes += if breakpoint.to_s == 'xs'
                      " m#{direction}-#{unit}"
                    else
                      " m#{direction}-#{breakpoint}-#{unit}"
                    end
      end
    end
  end

  def add_paddings
    @options[:paddings]&.each do |breakpoint, spacers|
      spacers.each do |direction, unit|
        @classes += if breakpoint.to_s == 'xs'
                      " p#{direction}-#{unit}"
                    else
                      " p#{direction}-#{breakpoint}-#{unit}"
                    end
      end
    end
  end

  def add_displays
    @options[:display]&.each do |breakpoint, display|
      @classes += if breakpoint.to_s == 'xs'
                    " d-#{display}"
                  else
                    " d-#{breakpoint}-#{display}"
                  end
    end
  end

  def add_data_attributes
    @data_attributes = ''
    return unless @data

    @data.each { |k, v| @data_attributes += " data-#{k.to_s.dasherize}='#{v}'" }
    # rubocop:disable Rails/OutputSafety
    @data_attributes = raw @data_attributes
    # rubocop:enable Rails/OutputSafety
  end

  def ios_mobile_device?
    browser.device.ipad? || browser.device.iphone?
  end

end
